import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useRef, useState } from 'react'
import { createArticleAPI, getArticleByIdAPI, putArticleByIdAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'


const { Option } = Select

const Publish = () => {
  const { channelList } = useChannel()
  const formRef = useRef()
  //获取几张图片
  const [imgType, setImgType] = useState(1)
  const onChangeRadio = (ev) => {
    console.log(ev.target.value);
    setImgType(ev.target.value)
  }
  //图片
  const [imageList, setImageList] = useState([])
  //回填数据
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  //获取实例
  const [form] = Form.useForm()
  console.log(articleId);
  useEffect(() => {
    const getArticleDetail = async () => {
      const res = await getArticleByIdAPI(articleId)
      const data = res.data
      const { cover } = data
      form.setFieldsValue({
        ...data,
        type: cover.type,
      })
      setImgType(cover.type)
      //显示图片
      setImageList(cover.images.map(url => {
        return { url }
      }))
    }
    if (articleId) {
      getArticleDetail()
    }

  }, [articleId, form])

  const onUploadChange = (value) => {
    console.log('上传', value);
    setImageList(value.fileList)
  }
  //提交表单
  const navigate = useNavigate()
  const onFinish = async (form) => {
    // console.log(form);
    const { title, content, channel_id } = form
    //校验封面类型
    if (imageList.length !== imgType) {
      return message.warning('封面图片和图片数量不匹配')
    }
    const reqData = {
      title: title,
      content: content,
      cover: {
        type: imgType,
        images: imageList.map(item => {
          if (item.response) {
            return item.response.data.url
          } else {
            return item.url
          }
        })
      },
      channel_id: channel_id
    }
    //新增接口
    if (articleId) {
      await putArticleByIdAPI({ ...reqData, id: articleId })
    } else {
      await createArticleAPI(reqData)
    }
    formRef.current.resetFields(['title', 'channel_id', 'img', 'content'])
    message.success('提交成功')
    navigate('/article')
  }
  const reload = () => {
    // navigate('/')
    // window.location.reload()
  }
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'} onClick={reload}>首页</Link> },
            { title: articleId ? '编辑文章' : '发布文章' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          ref={formRef}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面" name="img">
            <Form.Item name="type">
              <Radio.Group onChange={onChangeRadio}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgType > 0 && <Upload
              name='image'
              listType="picture-card"
              maxCount={imgType}
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              onChange={onUploadChange}
              fileList={imageList}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className='publish-quill'
              theme='snow'
              placeholder='请输入文章内容'
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
