import ContentLoader from "react-content-loader";

export default function LoadingProductsPage(props: any) {
  return (
    <ContentLoader
      speed={2}
      width={1800}
      height={1800}
      viewBox="0 0 1800 1800"
      backgroundColor="#e3e3e3"
      foregroundColor="#ecebeb"
      {...props}
    >
      {/* breadcrumbs */}
      <rect x="220" y="10" rx="3" ry="3" width="160" height="18" />

      {/* Category and results */}
      <rect x="220" y="70" rx="3" ry="3" width="175" height="40" />
      <rect x="220" y="140" rx="3" ry="3" width="60" height="15" />

      {/* Banner */}
      <rect x="770" y="65" rx="3" ry="3" width="900" height="90" />

      {/* Button below banner */}
      <rect x="1590" y="175" rx="3" ry="3" width="80" height="35" />

      {/* Aside */}
      <rect x="220" y="260" rx="3" ry="3" width="290" height="700" />

      {/* Products grid */}
      <rect x="530" y="260" rx="5" ry="5" width="370" height="380" />
      <rect x="530" y="655" rx="0" ry="0" width="100" height="15" />
      <rect x="530" y="677" rx="0" ry="0" width="125" height="12" />
      <rect x="530" y="697" rx="0" ry="0" width="85" height="12" />

      <rect x="920" y="260" rx="5" ry="5" width="370" height="380" />
      <rect x="920" y="655" rx="0" ry="0" width="100" height="15" />
      <rect x="920" y="677" rx="0" ry="0" width="125" height="12" />
      <rect x="920" y="697" rx="0" ry="0" width="85" height="12" />

      <rect x="1310" y="260" rx="5" ry="5" width="370" height="380" />
      <rect x="1310" y="655" rx="0" ry="0" width="100" height="15" />
      <rect x="1310" y="677" rx="0" ry="0" width="125" height="12" />
      <rect x="1310" y="697" rx="0" ry="0" width="85" height="12" />

      <rect x="530" y="749" rx="5" ry="5" width="370" height="380" />
      <rect x="530" y="1144" rx="0" ry="0" width="100" height="15" />
      <rect x="530" y="1166" rx="0" ry="0" width="125" height="12" />
      <rect x="530" y="1186" rx="0" ry="0" width="85" height="12" />

      <rect x="920" y="749" rx="5" ry="5" width="370" height="380" />
      <rect x="920" y="1144" rx="0" ry="0" width="100" height="15" />
      <rect x="920" y="1166" rx="0" ry="0" width="125" height="12" />
      <rect x="920" y="1186" rx="0" ry="0" width="85" height="12" />

      <rect x="1310" y="749" rx="5" ry="5" width="370" height="380" />
      <rect x="1310" y="1144" rx="0" ry="0" width="100" height="15" />
      <rect x="1310" y="1166" rx="0" ry="0" width="125" height="12" />
      <rect x="1310" y="1186" rx="0" ry="0" width="85" height="12" />
    </ContentLoader>
  );
}
