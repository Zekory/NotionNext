import BLOG from '@/blog.config'
import { getPageTableOfContents } from 'notion-utils'
import TocDrawerButton from './components/TocDrawerButton'
import LayoutBase from './LayoutBase'
import Card from './components/Card'
import LatestPostsGroup from './components/LatestPostsGroup'
import ArticleDetail from './components/ArticleDetail'
import TocDrawer from './components/TocDrawer'
import Live2D from './components/Live2D'
import { useRef } from 'react'
import CONFIG_NEXT from './config_next'

export const LayoutSlug = ({
  post,
  tags,
  prev,
  next,
  recommendPosts,
  categories,
  postCount,
  latestPosts
}) => {
  const meta = {
    title: `${post.title} | ${BLOG.TITLE}`,
    description: post.summary,
    type: 'article',
    tags: post.tags
  }

  const drawerRight = useRef(null)
  const targetRef = typeof window !== 'undefined' ? document.getElementById('container') : null
  if (post?.blockMap?.block) {
    post.content = Object.keys(post.blockMap.block)
    post.toc = getPageTableOfContents(post, post.blockMap)
  }
  const floatSlot = post?.toc?.length > 1
    ? <div className='block lg:hidden'><TocDrawerButton onClick={() => {
      drawerRight?.current?.handleSwitchVisible()
    }} /></div>
    : null

  return (
    <LayoutBase
      meta={meta}
      tags={tags}
      post={post}
      postCount={postCount}
      latestPosts={latestPosts}
      categories={categories}
      floatSlot={floatSlot}
      rightAreaSlot={
        CONFIG_NEXT.RIGHT_LATEST_POSTS && <Card><LatestPostsGroup posts={latestPosts} /></Card>
      }
    >
      <ArticleDetail
        post={post}
        recommendPosts={recommendPosts}
        prev={prev}
        next={next}
      />

      {/* 悬浮目录按钮 */}
      <div className='block lg:hidden'>
        <TocDrawer post={post} cRef={drawerRight} targetRef={targetRef} />
      </div>

      {/* 宠物 */}
      <Live2D />

    </LayoutBase>
  )
}
