import * as cheerio from "cheerio";

// 从 HTML 页面中解析出歌曲列表
export function ParserDownloadUrlList(webHtml) {
  // 使用 cheerio 加载网页内容
  const $ = cheerio.load(webHtml);

  const subject = $("a.icon.icon-left.pull-left").text().trim(); // 启航课程
  const title = $("title").text().trim(); // 灵修默想与应用
  const hubName = subject + "-" + title; // 启航课程-灵修默想与应用

  // throw new MessageError(hubName);

  // 获取 <div class="songs mt5"> 内的 <table> 下所有 <tr> 元素
  const liElements = $("li.cour");

  // 遍历并输出每个<tr>元素
  let list = [];
  liElements.each((i, element) => {

    /*
        <li class='cour'>
            <div class='col8'><a external='' href='https://lts33.net/elearn/servlet/elearn.Awless?lsref=LS000007166' class='cour'>第一课 简介</a></div>
            <div class='col10 right'>
            <a href='http://sp1.lyxyapp.com/mp3/qihang/mavnb/mavnb001.mp3?dl=1' ><img src='/images/app/jc_download.png' style='width:50%;padding-top:15px;'></a>
            <div>
        </li>
    */
    let name = $(element).find("a.cour").text().trim();
    let url = $(element).find("a").last().attr("href").trim();

    let item = {
      name: name,
      url: url,
    };
    list.push(item);
  });
  return [hubName, list];
}