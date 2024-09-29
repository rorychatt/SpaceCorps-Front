import { Avatar, ListSectionsButton, Title } from "../nav-components";

export function Nav() {
    return (
        <nav className="navbar">
            <ListSectionsButton/>
            <Title/>
            <Avatar/>
        </nav>
    )
}