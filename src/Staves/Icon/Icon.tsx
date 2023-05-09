import type { IconProps } from './Icon.types'
import './Icon.scss'
import React from 'react'

const Image = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <g>
      <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
    </g>
  </svg>
)

const Mail = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <g>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </g>
  </svg>
)

const Art = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <g>
      <path d="M12 3a9 9 0 0 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </g>
  </svg>
)

const Power = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <g>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0 1 19 12c0 3.87-3.13 7-7 7A6.995 6.995 0 0 1 7.58 6.58L6.17 5.17A8.932 8.932 0 0 0 3 12a9 9 0 0 0 18 0c0-2.74-1.23-5.18-3.17-6.83z" />
    </g>
  </svg>
)

const Pen = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <g>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </g>
  </svg>
)

const Video = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <g>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
    </g>
  </svg>
)

const Note = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <g>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </g>
  </svg>
)

const People = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <g>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </g>
  </svg>
)

const User = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <g>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </g>
  </svg>
)

const Problem = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
)

const Check = ({className, name, size}: IconProps) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

const Twitter = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} logo`}</title>
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
  </svg>
)

const Pinterest = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} logo`}</title>
    <g>
      <path
        d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </g>
  </svg>
)

const Linkedin = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} logo`}</title>
    <g>
      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
    </g>
  </svg>
)

const Behance = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} logo`}</title>
    <g>
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
    </g>
  </svg>
)

const Codepen = ({className, name, size}: IconProps) => (
  <svg
    height="30"
    width="30"
    viewBox="0 0 30 30"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} logo`}</title>
    <path d="M29.98 10.205l-.023-.107-.02-.063-.034-.094c-.01-.02-.02-.04-.028-.062-.014-.03-.028-.058-.045-.086a.732.732 0 0 0-.036-.06c-.018-.026-.035-.053-.055-.078a.772.772 0 0 0-.045-.056 2.123 2.123 0 0 0-.064-.07c-.016-.017-.032-.034-.05-.05a1.487 1.487 0 0 0-.073-.062c-.02-.015-.038-.03-.06-.044a.313.313 0 0 1-.02-.017L15.715.215a1.29 1.29 0 0 0-1.43 0L.575 9.356l-.022.018-.06.044c-.023.02-.048.04-.072.062l-.05.048c-.022.023-.044.046-.064.07-.015.02-.03.036-.044.056-.02.026-.037.052-.055.078l-.037.06c-.016.028-.03.057-.044.086l-.03.063a1.753 1.753 0 0 0-.052.158c-.01.035-.016.07-.022.107-.003.02-.008.037-.01.056-.008.056-.012.113-.012.17v9.14c0 .058.004.113.01.17l.012.055c.006.036.013.072.022.108l.02.063c.01.03.02.063.033.095l.03.063c.013.03.027.058.043.087.01.02.024.04.037.06.018.026.035.052.055.078.014.02.03.037.044.055a1.437 1.437 0 0 0 .188.182l.06.045.02.016 13.71 9.14c.218.142.467.214.716.214s.5-.072.715-.217l13.71-9.14c.01-.006.016-.012.022-.017a1.31 1.31 0 0 0 .132-.107l.05-.05a1.062 1.062 0 0 0 .108-.126c.02-.026.037-.052.055-.08a.933.933 0 0 0 .036-.058l.044-.087c.01-.022.02-.042.028-.063.013-.03.023-.063.033-.095.007-.02.015-.04.02-.063.01-.037.017-.073.023-.11.003-.018.008-.035.01-.055.008-.052.012-.108.012-.165v-9.14a1.19 1.19 0 0 0-.012-.17c-.002-.018-.007-.036-.01-.055zM15 18.05L10.44 15 15 11.95 19.56 15 15 18.05zm-1.29-8.34l-5.588 3.74L3.61 10.43l10.1-6.734V9.71zM5.804 15l-3.225 2.157v-4.314L5.803 15zm2.32 1.55l5.588 3.74V26.3l-10.1-6.734 4.512-3.017zm8.166 3.74l5.588-3.74 4.512 3.02-10.1 6.732V20.29zM24.195 15l3.226-2.157v4.314L24.196 15zm-2.318-1.55l-5.59-3.74V3.698L26.39 10.43l-4.512 3.02z" />
  </svg>
)

const Github = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} logo`}</title>
    <g>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </g>
  </svg>
)

const Medium = ({className, name, size}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="53.5 280.5 24 24"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} logo`}</title>
    <g>
      <path d="M69.868,288.673c-1.363,3.464-2.696,6.852-4.029,10.239c-0.291,0.739-0.585,1.478-0.87,2.22 c-0.087,0.227-0.167,0.393-0.476,0.394c-0.302,0.001-0.429-0.12-0.544-0.372c-1.824-3.996-3.656-7.988-5.486-11.982 c-0.06-0.13-0.122-0.26-0.229-0.492c-0.024,0.202-0.047,0.303-0.047,0.402c-0.002,2.75-0.015,5.5,0.013,8.249 c0.003,0.315,0.162,0.679,0.359,0.935c0.688,0.894,1.431,1.745,2.138,2.625c0.12,0.149,0.167,0.358,0.274,0.601 c-2.339,0-4.563,0-6.917,0c0.099-0.234,0.142-0.451,0.264-0.604c0.649-0.814,1.304-1.626,1.988-2.411 c0.364-0.418,0.519-0.854,0.515-1.415c-0.022-3.241-0.015-6.482-0.006-9.725c0.001-0.384-0.095-0.693-0.349-0.987 c-0.633-0.733-1.249-1.483-1.857-2.238c-0.123-0.152-0.182-0.356-0.293-0.586c0.2-0.021,0.299-0.039,0.397-0.039 c1.983-0.002,3.965,0.005,5.948-0.009c0.284-0.002,0.397,0.112,0.505,0.351c1.552,3.421,3.113,6.839,4.672,10.257 c0.071,0.154,0.146,0.308,0.252,0.533c0.084-0.186,0.146-0.308,0.197-0.434c1.378-3.432,2.759-6.863,4.123-10.301 c0.12-0.303,0.257-0.41,0.588-0.407c1.938,0.018,3.876,0.009,5.948,0.009c-0.109,0.235-0.15,0.442-0.273,0.569 c-0.486,0.495-1.017,0.948-1.49,1.455c-0.167,0.18-0.306,0.469-0.307,0.708c-0.018,4.196-0.018,8.394,0,12.59 c0.001,0.241,0.132,0.531,0.297,0.713c0.455,0.504,0.968,0.955,1.44,1.444c0.124,0.129,0.182,0.321,0.309,0.557 c-3.069,0-6.027,0-9.103,0c0.123-0.229,0.184-0.434,0.316-0.569c0.494-0.509,1.022-0.983,1.512-1.495 c0.136-0.143,0.26-0.368,0.261-0.557c0.015-3.357,0.01-6.715,0.009-10.072C69.916,288.801,69.901,288.777,69.868,288.673z" />
    </g>
  </svg>
)

const Date = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <g>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
    </g>
  </svg>
)

const Question = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <g>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </g>
  </svg>
)

const Label = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <g>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z" />
    </g>
  </svg>
)

const Tools = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <g>
      <path clipRule="evenodd" d="M0 0h24v24H0z" fill="none" />
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
    </g>
  </svg>
)

const LinkIcon = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <g>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
    </g>
  </svg>
)

const Cookie = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <g>
      <path d="M12 3a9 9 0 0 0-9 9a9 9 0 0 0 9 9a9 9 0 0 0 9-9c0-.5-.04-1-.13-1.5C20.6 10 20 10 20 10h-2V9c0-1-1-1-1-1h-2V7c0-1-1-1-1-1h-1V4c0-1-1-1-1-1M9.5 6A1.5 1.5 0 0 1 11 7.5A1.5 1.5 0 0 1 9.5 9A1.5 1.5 0 0 1 8 7.5A1.5 1.5 0 0 1 9.5 6m-3 4A1.5 1.5 0 0 1 8 11.5A1.5 1.5 0 0 1 6.5 13A1.5 1.5 0 0 1 5 11.5A1.5 1.5 0 0 1 6.5 10m5 1a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5m5 2a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5M11 16a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 11 19a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 11 16z" />
    </g>
  </svg>
)

const Construction = ({className, name, size}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <title>{`${name} icon`}</title>
    <g>
      <rect
        height="8.48"
        transform="matrix(0.7071 -0.7071 0.7071 0.7071 -6.8717 17.6255)"
        width="3"
        x="16.34"
        y="12.87"
      />
      <path d="M17.5,10c1.93,0,3.5-1.57,3.5-3.5c0-0.58-0.16-1.12-0.41-1.6l-2.7,2.7L16.4,6.11l2.7-2.7C18.62,3.16,18.08,3,17.5,3 C15.57,3,14,4.57,14,6.5c0,0.41,0.08,0.8,0.21,1.16l-1.85,1.85l-1.78-1.78l0.71-0.71L9.88,5.61L12,3.49 c-1.17-1.17-3.07-1.17-4.24,0L4.22,7.03l1.41,1.41H2.81L2.1,9.15l3.54,3.54l0.71-0.71V9.15l1.41,1.41l0.71-0.71l1.78,1.78 l-7.41,7.41l2.12,2.12L16.34,9.79C16.7,9.92,17.09,10,17.5,10z" />
    </g>
  </svg>
)

export const Icon = ({ name, className, size = '100%' }: IconProps) => {
  switch (name) {
    case 'image':
      return <Image name={name} className={className} size={size}/>
    case 'mail':
      return <Mail name={name} className={className} size={size}/>
    case 'art':
      return <Art name={name} className={className} size={size}/>
    case 'power':
      return <Power name={name} className={className} size={size}/>
    case 'pen':
      return <Pen name={name} className={className} size={size}/>
    case 'video':
      return <Video name={name} className={className} size={size}/>
    case 'note':
      return <Note name={name} className={className} size={size}/>
    case 'people':
      return <People name={name} className={className} size={size}/>
    case 'user':
      return <User name={name} className={className} size={size}/>
    case 'problem':
      return <Problem name={name} className={className} size={size}/>
    case 'check':
      return <Check name={name} className={className} size={size}/>
    case 'twitter':
      return <Twitter name={name} className={className} size={size}/>
    case 'pinterest':
      return <Pinterest name={name} className={className} size={size}/>
    case 'linkedin':
      return <Linkedin name={name} className={className} size={size}/>
    case 'behance':
      return <Behance name={name} className={className} size={size}/>
    case 'codepen':
      return <Codepen name={name} className={className} size={size}/>
    case 'github':
      return <Github name={name} className={className} size={size}/>
    case 'medium':
      return <Medium name={name} className={className} size={size}/>
    case 'date':
      return <Date name={name} className={className} size={size}/>
    case 'question':
      return <Question name={name} className={className} size={size}/>
    case 'label':
      return <Label name={name} className={className} size={size}/>
    case 'tools':
      return <Tools name={name} className={className} size={size}/>
    case 'linkIcon':
      return <LinkIcon name={name} className={className} size={size}/>
    case 'cookie':
      return <Cookie name={name} className={className} size={size}/>
    case 'construction':
      return <Construction name={name} className={className} size={size}/>
    default:
      return null
  }
}
