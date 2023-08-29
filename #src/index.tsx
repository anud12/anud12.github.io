import React, { Fragment, useEffect } from "react";
import { Page } from "anud12.github.io_ui_base/src/components/Page"
import { Link } from "anud12.github.io_ui_base/src/components/atoms/Link";

const OnLoad = () => {
  useEffect(() => {
    if (window) {
      console.log(window.location)
    }
  }, []);

  return <Fragment />
}

export default (
  <Page title="anud12.github.io">
    <OnLoad />
    <Link href={"wifi"}>wifi</Link>
    <Link href={"ui_base"}>ui_base</Link>
    <Link href={"boxes"}>Boxes</Link>
  </Page>
)