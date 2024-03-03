//封装获取频道列表逻辑

const { getChannelAPI } = require("@/apis/article");
const { useState, useEffect } = require("react");

export function useChannel () {
  //获取频道列表
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    //封装函数调用接口
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    getChannelList()
  }, [])
  return {
    channelList
  }
}