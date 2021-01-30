import { Row, Col, Form, Input, Icon } from 'antd'
import Link from 'next/link'

const Header = props => {
    return (
        <header>
            <div className="container">
                <Row>
                    <Col flex="190px">
                        <Link href="/">
                            <a>
                                <img src="/logo-true-sensei.svg" />
                            </a>
                        </Link>
                    </Col>
                    <Col flex="auto">
                        <nav>
                            <ul>
                                <li>
                                    <Link href="/">
                                        <a>Home</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/">
                                        <a>Series</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/">
                                        <a>Movies</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/">
                                        <a>My list</a>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </Col>
                    <Col flex="268px">
                        <Form>
                            <Input.Search
                                placeholder="Animes, genre, etc."
                            />
                        </Form>
                    </Col>
                </Row>
            </div>
        </header>
    )
}

export default Header
