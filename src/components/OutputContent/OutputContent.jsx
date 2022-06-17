
const OutputContent = () => {
  function outputChangeHandler() {
    let text = document
      .querySelector("#json-target")
      .innerHTML.replace(/<br\/>/g, "\n")
      .replace(/<br>/g, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/gi, " ")
      .replace(/Object{...}/gi, "")
      .replace(/Array\[[0-9]+\]/gi, "");
    document.querySelector("#json-src").value = text;
  }
  
  return (
    <div
      className="content-right"
      onKeyUp={() => outputChangeHandler()}
    >
      <div className="ro" id="json-target"></div>
    </div>
  )
}
  
export default OutputContent