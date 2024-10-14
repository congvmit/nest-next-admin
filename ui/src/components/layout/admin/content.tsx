import { Content } from "antd/es/layout/layout";

const AdminContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Content
                style={{
                    margin: "24px 16px 0",
                }}
            >
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: "#ccc",
                        borderRadius: "#ccc",
                    }}
                >
                    {children}
                </div>
            </Content>
        </>
    );
};

export default AdminContent;
