import BLOG from '@/blog.config'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import LayoutBase from './LayoutBase'

export const Layout404 = props => {
  const router = useRouter()
  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    setTimeout(() => {
      if (window) {
        const article = document.getElementById('container')
        if (!article) {
          router.push('/').then(() => {
            console.log('找不到页面', router.asPath)
          })
        }
      }
    }, 3000)
  })

  return (
    <LayoutBase {...props} meta={{ title: `${BLOG.TITLE} | 页面找不到啦` }}>
      <div className="text-black w-full h-screen text-center justify-center content-center items-center flex flex-col">
        <div className="dark:text-gray-200">
          <h2 className="inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top">
            <FontAwesomeIcon icon={faSpinner} spin={true} className="mr-2" />
            404
          </h2>
          <div className="inline-block text-left h-32 leading-10 items-center">
            <h2 className="m-0 p-0">页面无法加载，即将返回首页</h2>
          </div>
        </div>
      </div>
    </LayoutBase>
  )
}
