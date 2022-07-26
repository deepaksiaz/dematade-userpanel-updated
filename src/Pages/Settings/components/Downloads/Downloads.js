import { Col, Row, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChartingData } from "../../../../Redux/Actions/settingActions";
import { HiCloudDownload } from "react-icons/hi";
import "./Downloads.scss";
import { DeMatade_Algo } from "../../../../Assets/Software/DeMatade_Algo";

function Downloads(props) {
  const [charting, setCharting] = useState();
  const chartingData = useSelector((state) => state?.Setting?.chartingData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChartingData());
  }, []);

  useEffect(() => {
    setCharting(chartingData);
  }, [chartingData]);

  function download(url) {
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="downloads-main-wrap">
      <Row className="single-item">
        <Col span={7}>
          <span className="field-label">Charting ID</span>
        </Col>
        <Col span={2}>:</Col>
        <Col span={8}>
          <span className="field-value">{charting?.charting_id || "-"}</span>
        </Col>
      </Row>
      <Row className="single-item">
        <Col span={7}>
          <span className="field-label">Charting Password</span>
        </Col>
        <Col span={2}>:</Col>
        <Col span={8}>
          <span className="field-value">
            {charting?.charting_password || "-"}
          </span>
        </Col>
      </Row>
      <Row className="single-item">
        <Col span={7}>
          <span className="field-label">Charting IP</span>
        </Col>
        <Col span={2}>:</Col>
        <Col span={8}>
          <span className="field-value">{charting?.charting_ip || "-"}</span>
        </Col>
      </Row>
      <a
        href={DeMatade_Algo}
        download="DeMatade_Algo.exe"
        // onClick={() =>
        //   download(
        //     "https://trade-panel.dematadesolution.com/Charting_Software/DeMatade%20Algo.exe"
        //   )
        // }
        className="charting-download-btn"
      >
        <HiCloudDownload className="btn-icon" />
        <span className="btn-label">
          Click here to download Charting Software
        </span>
      </a>
    </div>
  );
}

export default Downloads;
