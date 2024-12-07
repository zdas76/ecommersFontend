/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, FormProps, Input, Select, Upload } from "antd";
import { Link, useNavigate } from "react-router";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateUserMutation } from "../../redux/features/userApi";
import { toast } from "sonner";

type FieldType = {
  name: string;
  contactNumber?: string;
  address?: string;
  email: string;
  passWord: string;
  role:string;
  avatar?: any;
};

export default function Register() {

const [registration] = useCreateUserMutation();
const navigate = useNavigate();

  const normFile = (e: { file: File; fileList: FileList }) => {
    // if (Array.isArray(e)) {
    //   return e;
    // }
    return e?.file;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { avatar, ...data } = values;
    console.log(data)
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", avatar?.originFileObj);
    
    const toastId = toast.loading("Creating ....");
    try {
      const result:any = await registration(formData);
      if (result.data.data.success) {
        toast.success(`${result?.message}`, {
          id: toastId,
          duration: 2000,
        });
        navigate(`/login`);
      }
    } catch (error: any) {
      toast.error(`${error?.message}`, {
        id: toastId,
        duration: 2000,
      });
    }
    
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)] my-5">
      <div className="border shadow-xl p-6">
        <p className="text-2xl text-center my-5 font-bold">Registration Form</p>
        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="w-full md:w-[500px] px-5"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Register as a"
            name="role"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Search to Select"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "VENDOR",
                  label: "VENDOR",
                },
                {
                  value: "COSTOMER",
                  label: "COSTOMER",
                },
                
              ]}
            />
            
          </Form.Item>

          <Form.Item<FieldType>
            label="Contact Number"
            name="contactNumber"
            
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Address"
            name="address"
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="passWord"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Min Pass lanth 6" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="avatar"
            label="User Avatar"
            valuePropName="file"
            getValueFromEvent={normFile}
          >
            <Upload name="avatar" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item label={null} className="text-center">
            <Button type="primary" htmlType="submit" className="w-40">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center">
          Already Registred?
          <Link to="/login">
            <span className="text-blue-600">Please Login!</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
