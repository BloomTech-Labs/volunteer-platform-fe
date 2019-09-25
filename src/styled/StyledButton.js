import styled from "styled-components";
import { Button } from "antd";

export const StyledButton = styled( Button )`
  && {
    background:${({theme, standard}) => !standard && theme.primary};
    border: 0;
  }

`;

