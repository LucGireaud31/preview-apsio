import { Outlet } from "react-router-dom";

interface LayoutProps{
};

export function Layout(props:LayoutProps) {
const {} = props;

return (
<>
<Outlet/>
</>
);
}