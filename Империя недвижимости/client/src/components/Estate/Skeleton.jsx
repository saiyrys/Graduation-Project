import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    style={{
      backgroundColor: "rgba(var(--accent), 1)",
      borderRadius: "12px",
      boxShadow: "1px 1px 2px 0.1px rgba(00, 00, 00, .4)",
    }}
    speed={2}
    width={400}
    height={460}
    viewBox='0 0 400 460'
    backgroundColor='#e1e1e1'
    foregroundColor='#dfdfdf'
    {...props}
  >
    <rect x='20' y='20' rx='8' ry='8' width='360' height='200' />
    <rect x='280' y='240' rx='5' ry='5' width='100' height='30' />
    <rect x='20' y='242' rx='5' ry='5' width='120' height='25' />
    <rect x='20' y='285' rx='4' ry='4' width='160' height='18' />
    <rect x='20' y='310' rx='4' ry='4' width='120' height='18' />
    <rect x='20' y='335' rx='4' ry='4' width='80' height='18' />
    <rect x='20' y='360' rx='4' ry='4' width='240' height='18' />
    <rect x='20' y='400' rx='4' ry='4' width='120' height='40' />
  </ContentLoader>
);

export default Skeleton;
