import WorkspaceDemo from "./WorkspaceDemo";
import CareerMapDemo from "./CareerMapDemo";
import ImageAnalysisDemo from "./ImageAnalysisDemo";
import "./WorkMock.css";

// Project visuals are small interactive demos drawn in code (no screenshots yet).
// Swap an entry for a real screenshot or recording once one exists.
const visuals = {
  workspace: WorkspaceDemo,
  map: CareerMapDemo,
  analysis: ImageAnalysisDemo,
};

export default function ProjectVisual({ name }) {
  const Visual = visuals[name];
  return Visual ? <Visual /> : null;
}
