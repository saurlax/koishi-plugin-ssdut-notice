import { Context, Schema } from "koishi";
import {} from "koishi-plugin-cron";
import { JSDOM } from "jsdom";
import sources, { SSDUTNotice } from "./sources";

export const name = "ssdut-notice";

export const inject = ["database", "cron", "http"];

export interface Config {
  alert: boolean;
  platform: string;
  selfId: string;
  groups: string[];
}

export const Config: Schema<Config> = Schema.object({
  alert: Schema.boolean().description("是否开启通知").default(false),
  platform: Schema.string().description("机器人平台"),
  selfId: Schema.string().description("机器人账号"),
  groups: Schema.array(Schema.string()).description("通知群组"),
});

declare module "koishi" {
  interface Tables {
    "ssdut-notice": SSDUTNotice;
  }
}

async function updateNotices(ctx: Context) {
  const noticesFetched: SSDUTNotice[] = [];
  for (const src of sources) {
    const dom = new JSDOM(await ctx.http.get(src.url)).window.document;
    const items = Array.from(dom.querySelectorAll(src.selector))
      .slice(0, 10)
      .map((a: HTMLAnchorElement) => src.praser(a));

    noticesFetched.push(...items);
  }

  const noticesFiltered: SSDUTNotice[] = [];

  for (const notice of noticesFetched) {
    const noticesStored = await ctx.database.get("ssdut-notice", {
      url: notice.url,
    });
    if (noticesStored.length === 0) {
      await ctx.database.create("ssdut-notice", notice);
      noticesFiltered.push(notice);
      ctx.logger.info(`${notice.url} ${notice.title}`);
    }
  }

  return noticesFiltered;
}

async function pushNotices(ctx: Context) {
  const notices = await updateNotices(ctx);
  const message = notices
    .map((notice) => {
      return notice.title + "\n" + notice.url;
    })
    .join("\n\n");

  if (ctx.config.alert && message) {
    const bot = ctx.bots[`${ctx.config.platform}:${ctx.config.selfId}`];
    for (const group of ctx.config.groups) {
      bot.sendMessage(group, message);
    }
  }
  return notices.length;
}

export function apply(ctx: Context, config: Config) {
  ctx.model.extend("ssdut-notice", {
    id: "unsigned",
    url: "string",
    title: "string",
  });

  ctx.cron("0 * * * *", () => {
    pushNotices(ctx);
  });

  ctx
    .command("ssdut-notice [count:number]", "获取大工开发区通知")
    .usage("获取最近 count 条通知")
    .action(async (_, count = 5) => {
      count = count > 20 ? 20 : count;

      const notices = await ctx.database.get(
        "ssdut-notice",
        {},
        { limit: count, sort: { id: "desc" } }
      );

      let message = notices
        .map((notice) => {
          return notice.title + "\n" + notice.url;
        })
        .join("\n\n");

      return message;
    });

  ctx.command("ssdut-notice.update", "更新大工开发区通知").action(async () => {
    const length = await pushNotices(ctx);
    if (length) {
      return `已更新 ${length} 条通知`;
    } else {
      return `没有新通知`;
    }
  });
}
