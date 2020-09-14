/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

import { ReactComponent as InfoIcon } from "../fonts/icomoon/svg/info.svg";

const InfoLabel = styled.label`
  margin-left: 10px;
  opacity: .5;
  cursor: pointer;
  &:hover {
    opacity: .75;
  }

`

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input`
  position: absolute;
  margin: -1px;
  border: 0;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  clip-path: inset(50%);
`

const InfoCheckbox = ({ checked, onChange }) => (
  <InfoLabel>
    <HiddenCheckbox
      type="checkbox"
      id="infoCheckbox"
      checked={checked}
      onChange={onChange}
    />
    <InfoIcon />
  </InfoLabel>
)

export default InfoCheckbox;