import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

/**
 * reset.css
 * http://meyerweb.com/eric/tools/css/reset/
 * v2.0 | 20110126
 * License: none (public domain)
 */
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}

/**
 * Best practice from http://callmenick.com/post/the-new-box-sizing-reset
 * TLDR: It’s easier to override and a slight performance boost.
 */
 *,
*::before,
*::after {
  box-sizing: inherit;
}
html {
  box-sizing: border-box;
  [type='button'] {
    appearance: none;
  }
}
body {
  background-color: #FAFBFC;
  color: #0F131A;
  font-size: 16px;
  line-height: 24px;
}
`;

export default GlobalStyles;
