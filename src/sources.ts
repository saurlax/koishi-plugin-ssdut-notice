export interface SSDUTNotice {
  id: number;
  url: string;
  title: string;
}

interface NoticeSource {
  url: string;
  selector: string;
  praser: (a: HTMLAnchorElement) => SSDUTNotice;
}

function genid() {
  return Math.floor((Date.now() + Math.random()) * 1000);
}

const sources: NoticeSource[] = [
  {
    // 教务处部院信息
    url: "https://teach.dlut.edu.cn/byxx/byxx.htm",
    selector: ".list ul li a",
    praser: (a) => {
      return {
        id: genid(),
        url: a.href.replace("..", "https://teach.dlut.edu.cn"),
        title: a.title,
      };
    },
  },
  {
    // 软件学院-本科生通知
    url: "https://ss.dlut.edu.cn/rcpy/bkspy/bkstz.htm",
    selector: ".list04 .item a",
    praser: (a) => {
      return {
        id: genid(),
        url: a.href.replace("..", "https://ss.dlut.edu.cn"),
        title: a.querySelector("h2").textContent,
      };
    },
  },
  {
    // 软件学院-创新实践-活动公告
    url: "https://ss.dlut.edu.cn/rcpy/cxsj/hdtz.htm",
    selector: ".list04 .item a",
    praser: (a) => {
      return {
        id: genid(),
        url: a.href.replace("..", "https://ss.dlut.edu.cn"),
        title: a.querySelector("h2").textContent,
      };
    },
  },
  {
    // 软件学院-国际交流
    url: "https://ss.dlut.edu.cn/gjhzjl/gjjl.htm",
    selector: ".list04 .item a",
    praser: (a) => {
      return {
        id: genid(),
        url: a.href.replace("..", "https://ss.dlut.edu.cn"),
        title: a.querySelector("h2").textContent,
      };
    },
  },
  {
    // 软件学院-国际交流-通知公告
    url: "https://ss.dlut.edu.cn/gjhzjl/tzgg.htm",
    selector: ".list04 .item a",
    praser: (a) => {
      return {
        id: genid(),
        url: a.href.replace("..", "https://ss.dlut.edu.cn"),
        title: a.querySelector("h2").textContent,
      };
    },
  },
  {
    // 软件学院-学生工作-通知公告
    url: "https://ss.dlut.edu.cn/xsgz/tzgg.htm",
    selector: ".list04 .item a",
    praser: (a) => {
      return {
        id: genid(),
        url: a.href.replace("..", "https://ss.dlut.edu.cn"),
        title: a.querySelector("h2").textContent,
      };
    },
  },
  {
    // 软件学院-学生工作-学生活动
    url: "https://ss.dlut.edu.cn/xsgz/xshd.htm",
    selector: ".list04 .item a",
    praser: (a) => {
      return {
        id: genid(),
        url: a.href.replace("..", "https://ss.dlut.edu.cn"),
        title: a.querySelector("h2").textContent,
      };
    },
  },
  {
    // 教学运行保障中心开发区通知
    url: "https://jxyxbzzx.dlut.edu.cn/tzgg/kfqxq.htm",
    selector: ".l_section_4 .subnav",
    praser: (a) => {
      return {
        id: genid(),
        url: a.href.replace("..", "https://jxyxbzzx.dlut.edu.cn"),
        title: a.textContent,
      };
    },
  },
  {
    // 开发区校区管委会通知
    url: "https://eda.dlut.edu.cn/n/tzgg.htm",
    selector: ".list li a",
    praser: (a) => {
      return {
        id: genid(),
        url: a.href.replace("..", "https://eda.dlut.edu.cn"),
        title: a.title,
      };
    },
  },
  {
    // 开发区校区管委会选课安排
    url: "https://eda.dlut.edu.cn/ggjx/xkap.htm",
    selector: ".list li a",
    praser: (a) => {
      return {
        id: genid(),
        url: a.href.replace("..", "https://eda.dlut.edu.cn"),
        title: a.title,
      };
    },
  },
  {
    // 开发区校区管委会考试安排
    url: "https://eda.dlut.edu.cn/ggjx/ksap.htm",
    selector: ".list li a",
    praser: (a) => {
      return {
        id: genid(),
        url: a.href.replace("..", "https://eda.dlut.edu.cn"),
        title: a.title,
      };
    },
  },
];

export default sources;
