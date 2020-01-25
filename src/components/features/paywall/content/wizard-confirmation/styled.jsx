import { styled } from "@material-ui/core/styles";

import _Markdown from "../../../../global-components/markdown";
import ProgressComponent from "../../_children/progress";
import PanelComponent from "../../_children/panel";

export const Title = styled(_Markdown)(({ theme }) => ({
  fontSize: "30px",
  fontWeight: "700",
  fontFamily: theme.palette.secondary.main,
  textAlign: "center"
}));

export const Subtitle = styled(_Markdown)(({ theme, large }) => ({
  display: "inline",
  margin: "30px 0",
  padding: "0 50px",
  textAlign: "center",
  boxSizing: "border-box",
  maxWidth: "480px",
  lineHeight: large ? "24px" : "1.71",
  fontSize: large ? "20px" : "14px",
  color: theme.palette.common.blackboard,
  [theme.breakpoints.down("xs")]: {
    padding: 0
  }
}));

export const Content = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: "40px 100px",
  alignItems: "center",
  flex: 1,
  [theme.breakpoints.down("xs")]: {
    padding: "30px"
  },
  [theme.breakpoints.only("sm")]: {
    minHeight: "500px"
  }
}));

export const CardSummary = styled("div")(({ theme }) => ({
  borderRadius: "4px",
  backgroundColor: theme.palette.background.default,
  padding: "30px 26px",
  boxSizing: "border-box",
  width: "100%",
  marginBottom: "20px"
}));

export const Item = styled("div")({
  fontSize: "14px",
  marginBottom: "17px"
});

export const Small = styled("div")(({ theme }) => ({
  fontSize: "14px",
  lineHeight: "26px",
  color: theme.palette.common.blackboard
}));

export const WrapButton = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  margin: "20px 0",
  position: "relative"
});

export const WrapIcon = styled("div")(({ theme }) => ({
  width: "86px",
  height: "46px",
  borderRadius: "4px",
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}));

export const ContentBenefice = styled("div")(({ theme }) => ({
  display: "flex",
  margin: "10px 0",
  [theme.breakpoints.down("xs")]: {
    flexDirection: "column",
    alignItems: "center"
  }
}));

export const WrapText = styled("div")(({ theme }) => ({
  color: theme.palette.common.blackboard,
  marginLeft: "12px",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "flex-start",
  [theme.breakpoints.down("xs")]: {
    margin: "25px 20px"
  }
}));

export const Detail = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%"
});

export const Notice = styled(_Markdown)(({ theme }) => ({
  display: "inline",
  fontSize: "14px",
  textAlign: "center",
  lineHeight: "24px",
  [theme.breakpoints.down("xs")]: {
    textAlign: "center"
  }
}));

export const DetailTitle = styled(_Markdown)({
  fontSize: "16px",
  lineHeight: "2.14",
  marginBottom: "15px"
});

export const Names = styled("span")({
  textTransform: "capitalize"
});

export const Progress = styled(ProgressComponent)({
  position: "absolute",
  bottom: "-7px"
});

export const Panel = styled("div")(({ theme }) => ({
  borderRadius: "5px",
  backgroundColor: "#fff",
  [theme.breakpoints.only("sm")]: {
    flexDirection: "column-reverse",
    alignItems: "center"
  }
}));
