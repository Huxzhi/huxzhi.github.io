import { getGlobalData } from '@/utils/data.js'
import { cn, useAttrRef } from '@/utils/dom'
import type { UserInfo } from '@/utils/storage.js'
import { formatSecond } from '@/utils/time.js'
import * as React from 'jsx-dom'
import config from 'urodele.config'
import { useDialog } from '../Dialog'
import { getUserInfo, login, logout } from './auth.js'

const Login = () => {
  const createModal = () => {
    const [buttonRef, setButtonRef] = useAttrRef({
      disabled: true,
      'data-loading': false,
    })
    const inputRef = React.useRef<HTMLInputElement>()
    const onInput = () => {
      setButtonRef({
        disabled: !inputRef.current?.value.length,
      })
    }
    const toConfirm = async () => {
      const value = inputRef.current?.value
      if (!value) return
      setButtonRef({ 'data-loading': true })
      try {
        await login(value)
        location.reload()
      } catch (error: any) {
        alert(error.message)
      } finally {
        setButtonRef({ 'data-loading': false })
      }
    }
    const showOAuthLogin = Boolean(config.github.logInUrl)
    return (
      <div class="flex flex-col p-4 tabset-container">
        <style>{`
          .tabset-container input[type="radio"] { display: none; }
          .tabset-container input[data-tab-name="direct"]:checked ~ .tab-panels .tab-panel[data-tab-name="direct"] { display: block; }
          .tabset-container input[data-tab-name="direct"]:checked ~ .tab-panels .tab-panel[data-tab-name="app"] { display: none; }
          .tabset-container input[data-tab-name="app"]:checked ~ .tab-panels .tab-panel[data-tab-name="app"] { display: block; }
          .tabset-container input[data-tab-name="app"]:checked ~ .tab-panels .tab-panel[data-tab-name="direct"] { display: none; }
          .tabset-container input[data-tab-name="direct"]:checked ~ .tab-labels label[data-tab-name="direct"] { border-bottom: 2px solid red; }
          .tabset-container input[data-tab-name="app"]:checked ~ .tab-labels label[data-tab-name="app"] { border-bottom: 2px solid red; }
          .tab-panels { display: flex; }
        `}</style>
        <input
          type="radio"
          name="tabset"
          id="tab1"
          data-tab-name="direct"
          checked={!showOAuthLogin}
        />
        <input
          type="radio"
          name="tabset"
          id="tab2"
          data-tab-name="app"
          checked={showOAuthLogin}
        />
        <div
          class={cn(
            'flex gap-4 justify-center pb-4 tab-labels',
            !showOAuthLogin && 'hidden!',
          )}
        >
          <label
            data-tab-name="direct"
            htmlFor="tab1"
            class="cursor-pointer"
          >
            Direct
          </label>
          <label
            data-tab-name="app"
            htmlFor="tab2"
            class="cursor-pointer"
          >
            App
          </label>
        </div>
        <div class="tab-panels">
          <div
            class="panel-direct tab-panel"
            data-tab-name="direct"
          >
            <div class="flex flex-col gap-4">
              <div>Enter your github token:</div>
              <p class="text-red text-sm font-bold">
                Don't enter your Github token if you are not owner of this site
                !!!
              </p>
              <a
                href="https://github.com/settings/personal-access-tokens/new"
                target="_blank"
                class="text-xs underline text-blue"
              >
                learn here
              </a>
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                placeholder="paste your token here"
                class="rounded border dark:border-gray px-2 py-1 text-sm bg-transparent"
                onInput={onInput}
                onChange={toConfirm}
              />
              <button
                class="buttoned bg-blue"
                ref={buttonRef}
                onClick={toConfirm}
              >
                confirm
              </button>
            </div>
          </div>
          <div
            class="panel-app w-full h-full tab-panel"
            data-tab-name="app"
          >
            <div class="w-full h-full flex justify-center p-2">
              <a
                href={config.github.logInUrl}
                class="buttoned bg-[#202328] text-white text-sm"
              >
                <div class="i-ri:github-fill"></div> Login with Github
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const dialog = useDialog(createModal)

  const toLogin = () => {
    dialog.show()
  }
  const LoginButton = () => (
    <button
      class="text-sm inline-flex items-center justify-center w-6 h-6"
      onClick={toLogin}
      title="login"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="20"
        height="20"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    </button>
  )

  return LoginButton()
}

const Profile = (user: UserInfo) => {
  const toLogout = () => {
    logout()
    location.reload()
  }
  const createModal = () => (
    <div class="w-full flex-1 flex flex-col gap-2 p-4 justify-between">
      <div>
        <div class="text-lg">Are you sure to log out?</div>
        <div class="text-gray text-sm">
          Token will be clear, make sure you saved it elsewhere
        </div>
      </div>
      <button
        class="buttoned bg-red"
        onClick={toLogout}
      >
        log out
      </button>
    </div>
  )
  const dialog = useDialog(createModal)
  const toShowProfile = () => {
    dialog.show()
  }
  const canEdit = Boolean(user.permissions?.push)
  const isHome = location.pathname === '/'
  const isIndex = isHome || /^\/\d+$/.test(location.pathname)
  const isPage = location.pathname.startsWith('/post/')
  const pageId = location.pathname.replace('/post/', '')

  console.log('Auth debug:', { isPage, pageId, pathname: location.pathname })

  if (canEdit && isHome) {
    handleDraft()
  }
  return (
    <div class="flex gap-2">
      {canEdit && isIndex && (
        <a
          href="/edit?new"
          class="text-button inline-flex items-center justify-center w-6 h-6"
          aria-label="create new post"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="20"
            height="20"
          >
            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
          </svg>
        </a>
      )}
      {canEdit && isPage && (
        <a
          href={`/edit?path=${pageId}`}
          class="text-button inline-flex items-center justify-center w-6 h-6"
          aria-label="edit current post"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="20"
            height="20"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.35 8.35a.75.75 0 0 0-.214.413l-.978 5.498a.75.75 0 0 0 .874.874l5.498-.978a.75.75 0 0 0 .413-.214l8.35-8.35Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
        </a>
      )}

      <div
        class="w-6 h-6 rounded-full cursor-pointer"
        onClick={toShowProfile}
      >
        <img
          src={user.avatar}
          alt=""
          class="rounded-full"
        />
      </div>
    </div>
  )
}

const Auth = () => {
  const wrapper = () => {
    const userInfo = getUserInfo()
    if (!userInfo) return Login()
    return Profile(userInfo)
  }
  return wrapper()
}

export const mount = (container: HTMLElement) => {
  if (!container) {
    // 防空校验
    console.error('Auth 挂载容器不存在')
    return
  }

  // 使用包装节点以便可以安全卸载
  const root = document.createElement('div')
  root.appendChild(Auth())
  container.appendChild(root)

  // 返回卸载函数
  return () => {
    root.remove()
  }
}

// 兼容：把 mount 暴露到全局，供纯前端脚本直接使用
;(window as any).__authMount = (el: HTMLElement) => mount(el)

const handleDraft = async () => {
  const allPost = await getGlobalData()
  const drafts = allPost.filter((v) => v.draft)
  const listWrapper = document.querySelector('.content')
  drafts.forEach((item) => {
    const dom = (
      <>
        <div
          data-page-draft="verified"
          class="pt-8 pb-2"
        >
          <a
            href={`/post/${item.id}`}
            class="px-4 pb-4 flex justify-between items-center group"
          >
            <div class="flex flex-col">
              <h1 class="page-title w-fit text-lg transition-all font-semibold group-hover:underline">
                {item.title}
              </h1>
              <p class="text-text text-opacity-60 text-sm">{item.intro}</p>
            </div>
            {item.cover && (
              <img
                class="w-16 h-16 rounded object-cover"
                src={item.cover.src}
                alt={item.cover.alt}
              />
            )}
          </a>
          <div class="flex pt-2 gap-2 px-4">
            {item.tags.map((tag) => (
              <a
                href={`/tag/${tag}`}
                class="text-sm text-gray hover:text-black"
              >
                #{tag}
              </a>
            ))}
          </div>
          <div
            data-acc-time={item.createTime}
            class="text-end text-xs text-gray"
          >
            {formatSecond(item.createTime)}
          </div>
        </div>
        <hr />
      </>
    )
    listWrapper?.insertBefore(dom, listWrapper.firstChild)
  })
}
