import React, { PureComponent } from "react"
import { Document, Page } from "react-pdf/build/entry.webpack"
import throttle from "lodash.throttle"
import pdf from "./pdf.pdf"

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {width: null}
    this.throttledSetDivSize = throttle(this.setDivSize, 500)
  }

  componentDidMount () {
    this.setDivSize()
    window.addEventListener("resize", this.throttledSetDivSize)
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.throttledSetDivSize)
  }

  setDivSize = () => {
    this.setState({width: this.pdfWrapper.getBoundingClientRect().width})
  }

  render() {
    return (
      <div id="row" style={{height: "100vh", width: "100vw", display: "flex", overflow: "hidden"}}>
        <div id="placeholderWrapper" style={{width: "10vw", height: "100vh"}}/>
        <div id="pdfWrapper" style={{width: "90vw"}} ref={(ref) => this.pdfWrapper = ref}>
          <PdfComponent wrapperDivSize={this.state.width} />
        </div>
      </div>
    )
  }
}

class PdfComponent extends PureComponent {
  render() {
    return (
      <div>
        <Document
          file={pdf}
        >
          <Page pageIndex={1} width={this.props.wrapperDivSize} />
        </Document>
      </div>
    )
  }
}

export default App