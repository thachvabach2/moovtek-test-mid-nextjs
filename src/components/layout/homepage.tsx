import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import Link from "next/link";

const HomePage = () => {
    return (
        <div className="text-center">
            <Result
                icon={<SmileOutlined />}
                title="This is HomePage"
                extra={<Link href={'/dashboard'} ><Button type="primary">Go to Admin Page</Button></Link>}
            />
        </div>
    )
}

export default HomePage;