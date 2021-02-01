import Link from 'next/link'
import { useRouter } from 'next/router'
import { Row, Col, Form, Input } from 'antd'
const { Search } = Input
import categories from '../../lib/categories'
import navByCategory from '../../lib/nav-by-category'

const Header = props => {
    return (
        <header className="site-header">
            <div className="container">
                <Row justify="space-between" align="middle" gutter={[40, 0]} className="site-header__row">
                    <Col xs={24} lg={4}>
                        <Link href="/">
                            <a>
                                <img src="/images/logo-true-sensei.svg" />
                            </a>
                        </Link>
                    </Col>
                    <Col xs={0} lg={20}>
                        <nav>
                            <ul>
                                <li>
                                    <Link href="/">
                                        <a>Home</a>
                                    </Link>
                                </li>

                                { typeof navByCategory !== 'undefined' ? navByCategory.map((item, index) => (
                                    <li key={index}>
                                        { item.list && item.list.length ? (
                                            <>
                                                <a>{ item.title }</a>
                                                <ul>
                                                    { item.list.map((item, index) => (
                                                        <li key={index}>
                                                            <Link href={`/category/${item.slug}`}>
                                                                <a>{ item.title }</a>
                                                            </Link>
                                                        </li>
                                                    )) }
                                                </ul>
                                            </>
                                        ) : (
                                            <Link href={`/category/${item.slug}`}>
                                                <a>{ item.title }</a>
                                            </Link>
                                        ) }
                                    </li>
                                )) : null}
                            </ul>
                        </nav>
                    </Col>
                    {/* <Col flex="268px">
                        <Form >
                            <Search
                                onSearch={onSearch}
                                className="site-header__search-input"
                                placeholder="Animes, genre, etc."
                                enterButton={ true }
                                size="large"
                                allowClear
                            />
                        </Form>
                    </Col> */}
                </Row>
            </div>
        </header>
    )
}

export default Header
