import * as jsDiff from "diff"

//获取对比后的结果及拼接展示效果
const diffJSON = (json1: any, json2: any) => {
  // diff之后的结果
  const diffResult = jsDiff.diffJson(json1, json2)
  //   const diffResult = jsDiff.createTwoFilesPatch('旧文件', '新文件', json1, json2)
  let addedList: String[] = []
  let removedList: String[] = []
  //遍历对比结果，摘出相应的数据
  //首先判断的量级为一行
  diffResult.forEach((diffObj: any, index: any) => {
    let content = diffObj.value
    let replaceContent = replaceContentFunc(content)
    //该项的下一项
    let next: any = diffResult[index + 1]
    let nextReplceContent = next && replaceContentFunc(next.value)
    if (diffObj.removed) {
      //需要展示在历史结果位置的数据
      let dealedContent = ""
      if (diffObj.removeContent) {
        dealedContent = diffObj.removeContent
      } else {
        //判断下一个项
        if (next && next.added) {
          //说明两个项之前是对应的关系
          //判断在不同的这行中，具体到字段的不同位置
          let testDiffList = jsDiff.diffWordsWithSpace(
            replaceContent,
            nextReplceContent
          )
          let { addContent, removeContent } = diffText(testDiffList)
          next.addContent = addContent
          dealedContent = removeContent
        } else {
          dealedContent =
            '<div class="error-line-remove" style="color:red"">' +
            replaceContent.replace(/\s/gm, "&ensp;") +
            "</div>"
        }
        removedList.push(dealedContent)
      }
    } else if (diffObj.added) {
      //需要展示在当前结果位置的数据
      let dealedContent = ""
      if (diffObj.addContent) {
        dealedContent = diffObj.addContent
      } else {
        //判断下一个项
        if (next && next.removed) {
          //说明两个项之前是对应的关系
          //判断在不同的这行中，具体到字段的不同位置
          let testDiffList = jsDiff.diffWordsWithSpace(
            replaceContent,
            nextReplceContent
          )
          let { addContent, removeContent } = diffText(testDiffList)
          next.removeContent = removeContent
          dealedContent = addContent
        } else {
          dealedContent =
            '<div class="error-line-add" style="color:red">' +
            replaceContent.replace(/\s/gm, "&ensp;") +
            "</div>"
        }
      }
      addedList.push(dealedContent)
    } else {
      //没有改动的部分
      replaceContent = replaceContent.replace(/\s/gm, "&ensp;")
      addedList.push("<div>" + replaceContent + "</div>")
      removedList.push("<div>" + replaceContent + "</div>")
    }
  })
  let addedHtml = addedList.join("")
  let removedHtml = removedList.join("")
  return {
    addedHtml,
    removedHtml,
  }
}

//对比行内容差异并且拼接结果
const diffText = (result: any) => {
  // json2 当前数据
  let addList: any = []
  // json1 原始数据
  let removeList: any = []
  result.forEach((item: any) => {
    let value = item.value.replace(/\s/gm, "&ensp;")
    if (item.added) {
      addList.push('<span style="color:red">' + value + "</span>")
    } else if (item.removed) {
      removeList.push('<span  style="color:red">' + value + "</span>")
    } else {
      removeList.push("<span>" + value + "</span>")
      addList.push("<span>" + value + "</span>")
    }
  })
  return {
    addContent: `<div class="error-line-add">${addList.join("")}</div>`,
    removeContent: `<div class="error-line-remove">${removeList.join(
      ""
    )}</div>`,
  }
}

//处理换行和空格
const replaceContentFunc = (content: any) => {
  let text = content
  if (content.indexOf("\n") >= 0) {
    // 换行替换为<br/>
    // 空格替换为&ensp;
    const reg1 = new RegExp("\n", "g")
    text = text.replace(reg1, "<br/>")
  }
  return text
}

export default diffJSON
