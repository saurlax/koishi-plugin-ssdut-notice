function genid() {
  return Math.floor((Date.now() + Math.random()) * 1000);
}

const sources = [
  {
    url: "https://teach.dlut.edu.cn/byxx/byxx.htm",
    selector: ".list ul li a",
    praser: (a: HTMLAnchorElement) => {
      return {
        id: genid(),
        url: a.href.replace("..", "https://teach.dlut.edu.cn"),
        title: a.title,
      };
    },
  },
  {
    url: "https://ss.dlut.edu.cn/index/bkstz.htm",
    selector: ".c_hzjl_list1 ul li a",
    praser: (a: HTMLAnchorElement) => {
      return {
        id: genid(),
        url: a.href.replace("..", "https://ss.dlut.edu.cn"),
        title: a.title,
      };
    },
  },
  {
    url: "https://jxyxbzzx.dlut.edu.cn/tzgg/kfqxq.htm",
    selector: ".l_text-wrapper_3 l_text_21 a",
    praser: (a: HTMLAnchorElement) => {
      return {
        id: genid(),
        url: a.href.replace("..", "https://jxyxbzzx.dlut.edu.cn"),
        title: a.innerText,
      };
    },
  },
  {
    url: "https://eda.dlut.edu.cn/n/tzgg.htm",
    selector: ".list ul li a",
    praser: (a: HTMLAnchorElement) => {
      return {
        id: genid(),
        url: a.href.replace("..", "https://eda.dlut.edu.cn"),
        title: a.title,
      };
    },
  },
  {
    url: "https://eda.dlut.edu.cn/ggjx/xkap.htm",
    selector: ".list ul li a",
    praser: (a: HTMLAnchorElement) => {
      return {
        id: genid(),
        url: a.href.replace("..", "https://eda.dlut.edu.cn"),
        title: a.title,
      };
    },
  },
];

export default sources;
