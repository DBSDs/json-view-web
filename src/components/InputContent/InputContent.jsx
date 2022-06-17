
import React from "react";
import { data } from "../../constants/mock-data";

const InputContent = () => {
  React.useEffect(() => {
    inputChangeHanlder(JSON.stringify(data))
  }, [])
  
function inputChangeHanlder(value) {
    try {
      document.querySelector("#json-target").innerHTML = JSONFormat(
        value
      ).toString();
      document.querySelectorAll(".icon-zhedie1").forEach((item) => {
        item.addEventListener("click", function () {
          hide(item);
        });
      });
    } catch (err) {
      document.querySelector("#json-target").innerHTML = err + "";
    }
  }

  return (
    <textarea
      id="json-src"
      className="content-left"
      placeholder="在此输入Json字符串..."
      onKeyUp={($event) => {
        inputChangeHanlder($event.target.value)
      }}
    >{ JSON.stringify(data)}</textarea>
  )
}

function JSONFormat(e) {
    let _toString = Object.prototype.toString; // 类型判断式
    let _bigNums = [];
    /**
     * 根据JSON类型赋值
     */
    function format(object, indent_count) {
      let html_fragment = "";
      switch (_typeof(object)) {
        case "Null":
          html_fragment = _format_null(object);
          break;
        case "Boolean":
          html_fragment = _format_boolean(object);
          break;
        case "Number":
          html_fragment = _format_number(object);
          break;
        case "String":
          html_fragment = _format_string(object);
          break;
        case "Array":
          html_fragment = _format_array(object, indent_count);
          break;
        case "Object":
          html_fragment = _format_object(object, indent_count);
          break;
        default:
          break;
      }
      return html_fragment;
    }
    // null类型
    function _format_null(object) {
      return '<span class="json_null" contenteditable="true">null</span>';
    }
    // 布尔值类型
    function _format_boolean(object) {
      return (
        '<span class="json_boolean" contenteditable="true">' +
        object +
        "</span>"
      );
    }
    // 数字类型
    function _format_number(object) {
      return (
        '<span class="json_number" contenteditable="true">' + object + "</span>"
      );
    }
    // 字符串类型
    function _format_string(object) {
      if (
        !isNaN(object) &&
        object.length >= 15 &&
        document.querySelectorAll.inArray(object, _bigNums) > -1
      ) {
        return _format_number(object);
      }
      object = object.replace(/</g, "&lt;");
      object = object.replace(/>/g, "&gt;");
      if (0 <= object.search(/^http/)) {
        object =
          '<a href="' +
          object +
          '" target="_blank" class="json_link" >' +
          object +
          "</a>";
      }
      return (
        '<span class="json_string" contenteditable="true">"' +
        object +
        '"</span>'
      );
    }
    // 数组类型
    function _format_array(object, indent_count) {
      let tmp_array = [];
      for (let i = 0, size = object.length; i < size; ++i) {
        tmp_array.push(
          indent_tab(indent_count) + format(object[i], indent_count + 1)
        );
      }
      return (
        '<span data-type="array" data-size="' +
        tmp_array.length +
        '" ><i  style="cursor:pointer;" class="iconfont icon-zhedie1"></i>[<br/>' +
        tmp_array.join(",<br/>") +
        "<br/>" +
        indent_tab(indent_count - 1) +
        "]</span>"
      );
    }
    // 对象类型
    function _format_object(object, indent_count) {
      let tmp_array = [];
      for (let key in object) {
        tmp_array.push(
          indent_tab(indent_count) +
            '<span class="json_key" contenteditable="true">"' +
            key +
            '"</span>:' +
            format(object[key], indent_count + 1)
        );
      }
      return (
        '<span data-type="object contenteditable="true""><i  style="cursor:pointer;" class="iconfont icon-zhedie1"></i>{<br/>' +
        tmp_array.join(",<br/>") +
        "<br/>" +
        indent_tab(indent_count - 1) +
        "}</span>"
      );
    }
    // 返回缩进TAB
    function indent_tab(indent_count) {
      return new Array(indent_count + 1).join("&nbsp;&nbsp;&nbsp;&nbsp;");
    }

    /**
     * 判断JSON类型方法
     */
    function _typeof(object) {
      let tf = typeof object,
        ts = _toString.call(object);

      return null === object
        ? "Null"
        : "undefined" === tf
        ? "Undefined"
        : "boolean" === tf
        ? "Boolean"
        : "number" === tf
        ? "Number"
        : "string" === tf
        ? "String"
        : "[object Function]" === ts
        ? "Function"
        : "[object Array]" === ts
        ? "Array"
        : "[object Date]" === ts
        ? "Date"
        : "Object";
    }

    /**
     * 为节点赋值Css类
     */
    function loadCssString() {
      let style = document.createElement("style");
      style.type = "text/css";
      let code = Array.prototype.slice.apply(arguments).join("");
      try {
        style.appendChild(document.createTextNode(code));
      } catch (ex) {
        style.styleSheet.cssText = code;
      }
      document.getElementsByTagName("head")[0].appendChild(style);
    }

    loadCssString(
      ".json_key{ color: #92278f;font-weight:bold;}",
      ".json_null{color: #f1592a;font-weight:bold;}",
      ".json_string{ color: #3ab54a;font-weight:bold;}",
      ".json_number{ color: #25aae2;font-weight:bold;}",
      ".json_boolean{ color: #f98280;font-weight:bold;}",
      ".json_link{ color: #61D2D6;font-weight:bold;}",
      ".json_array_brackets{}"
    );

    /**
     * 入口类
     * */
    class _JSONFormat {
      constructor(origin_data) {
        _bigNums = [];
        let check_data = origin_data.replace(/\s/g, "");
        let bigNum_regex = /[^\\]["]([[:]){1}(\d{16,})([,}]])/g;
        let m;
        do {
          m = bigNum_regex.exec(check_data);
          if (m) {
            _bigNums.push(m[2]);
            origin_data = origin_data.replace(
              /([[:])?(\d{16,})\s*([,}]])/,
              '$1"$2"$3'
            );
          }
        } while (m);
        this.data = JSON.parse(origin_data);
      }
      toString() {
        return format(this.data, 1);
      }
    }

    return new _JSONFormat(e);
}

function hide(obj) {
    let data_type = obj.parentNode.getAttribute("data-type") || [];
    let data_size = obj.parentNode.getAttribute("data-size") || [];
    obj.parentNode.style.display = "none";
    let span = document.createElement("span");
    span.className = "custom-plus";
    if (data_type === "array") {
      span.innerHTML =
        '<i  style="cursor:pointer;" class="plus iconfont icon-zhedie"></i>Array[<span class="json_number">' +
        data_size +
        "</span>]";
      obj.parentNode.before(span);
    } else {
      span.innerHTML =
        '<i  style="cursor:pointer;" class="plus iconfont icon-zhedie"></i>Object{...}';
      obj.parentNode.before(span);
    }
    span.onclick = function () {
      show(span);
    };
  }


function show(obj) {
  obj.nextSibling.style.display = "inline";
  obj.remove();
}
export default InputContent