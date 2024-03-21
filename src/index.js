// https://lts33.net/elearn/servlet/elearn.Awcour?coref=CO000000534

import * as libbase from "./lib/base.js";
import * as libelearn from "./lib/elearn.js";

gopeed.events.onResolve(async function(ctx) {

  let [name, files] = await handleElearn(ctx)

  ctx.res = {
    name: name,
    files: files,
  };
});

// 课程列表
async function handleElearn(ctx) {
  const elearnWebUrl = ctx.req.url;

  const elearnWebHtml = await libbase.FetchWebHtml(elearnWebUrl, gopeed.settings);

  const [hubName, elearnList] = libelearn.ParserDownloadUrlList(elearnWebHtml);

  let files = [];
  for (var i = 0; i < elearnList.length; i++) {
    let item = elearnList[i];

    let name = item["name"] + ".mp3";
    let url = item["url"];

    let file = {
      name: name,
      req: {
        url: url,
      },
    };
    files.push(file);
  }
  return [hubName, files];
}
