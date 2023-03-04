import{_ as a,X as i,Y as n,Z as e,$ as t,a1 as h,a2 as d,G as o}from"./framework-c2b0d87a.js";const p={},s=d('<h1 id="一、概述" tabindex="-1"><a class="header-anchor" href="#一、概述" aria-hidden="true">#</a> 一、概述</h1><p>互联网 Internet 专有名词 采用TCP/IP协议族 前身是ARPANET 互连网 internet 通用名词互联网的组成</p><ul><li><p>边缘部分：C/S 和 P2P</p></li><li><p>核心部分：</p><ul><li><p>电路交换：建立连接（独占）--&gt;数据通信--&gt;释放连接</p></li><li><p>报文交换：</p></li><li><p>分组交换：计算机网络的类别</p></li></ul></li></ul><p>计算机网络的类别： 按作用范围：WAL（广域网）、MAN（城域网）、LAN（局域网） 按使用者：公用网、专用网 扑朔结构 接入网AN（Access Network） ： 第一个路由器</p><p>计算机网络的性能 1.速率（额定） 2.带宽（最高） 3.吞吐量（实际） 4.时延：<br> 发送时延 发送第一个比特开始 数据帧长度（bit）/ 发送速率（bit/s） 传播时延 传播时间 信道长度（m）/传播速度（m/s） 处理时延 排队时延</p><p>计算机网络体系结构</p><table><thead><tr><th></th><th>OSI/KM的体系结构</th><th>TCP/IP协议</th><th>五层协议</th></tr></thead><tbody><tr><td>7</td><td>应用层</td><td>应用层（各种应用层协议如TELNET,FTP,SMTP等）</td><td></td></tr><tr><td>6</td><td>表示层</td><td></td><td></td></tr><tr><td>5</td><td>会话层</td><td></td><td>5 应用层</td></tr><tr><td>4</td><td>运输层</td><td>运输层（TCP或UDP）</td><td>4 运输层</td></tr><tr><td>3</td><td>网络层</td><td>网际层IP</td><td>3 网络层</td></tr><tr><td>2</td><td>数据链路层</td><td>网络接口层</td><td>2 数据链路层</td></tr><tr><td>1</td><td>物理层</td><td></td><td>1 物理层</td></tr></tbody></table>',7),c={href:"http://huxzhi-imgsubmit.oss-cn-beijing.aliyuncs.com/img/Everything",target:"_blank",rel:"noopener noreferrer"},l=d('<p>计算机网络中的数据交换必须遵守事先约定好的规则。网络协议 (network protocol)简称为协议，是为进行网络中的数据交换而建立的规则、标准或约定。 协议的三要素： 语法：数据与控制信息的结构或格式 。 语义：需要发出何种控制信息，完成何种动作以及做出何种响应。 同步：事件实现顺序的详细说明。</p><p>各层完成的主要功能 可以是一种也可以多种 ① 差错控制：使相应层次对等方的通信更加可靠。 ② 流量控制：发送端的发送速率必须使接收端来得及接收，不要太快。 ③ 分段和重装 ：发送端将要发送的数据块划分为更小的单位，在接收端将其还原。 ④ 复用和分用：发送端几个高层会话复用一条低层的连接，在接收端再进行分用。 ⑤ 连接建立和释放：交换数据前先建立一条逻辑连接，数据传送结束后释放连接。</p><h3 id="应用层" tabindex="-1"><a class="header-anchor" href="#应用层" aria-hidden="true">#</a> 应用层</h3><p>应用层的任务是通过应用进程间的交互来完成特定网络应用。这里的“进程”是指主机中正在运行的程序 应用层交互地数据单元称为报文（message）</p><h3 id="运输层" tabindex="-1"><a class="header-anchor" href="#运输层" aria-hidden="true">#</a> 运输层</h3><p>运输层的任务就是负责向两台主机中进程间的通信提供通用的数据传输服务，由于一台主机可同时运行多个进程，因此运输层有复用和分用的功能。 复用就是多个应用层进程可同时使用下面运输层的服务，分用是运输层把收到的信息分别交付给应用层中的相应进程 主要是两种协议</p><ul><li><p>传输控制协议TCP（Transmission Control Protocol）——提供面向连接的、可靠的数据传输服务，其数据传输的单位是报文段（segment）</p></li><li><p>用户数据报协议UDP（User Datagram Protocol）——提供无连接的、尽最大努力的数据传输服务（不保证数据传输的可靠性），其数据传输的单位是用户数据报。</p></li></ul><h3 id="网络层" tabindex="-1"><a class="header-anchor" href="#网络层" aria-hidden="true">#</a> 网络层</h3><p>网络层负责为分组交换网上的不同主机提供通信服务，能够实现异构网络互连、拥塞控制、路由选择 使用IP协议，因此分组也叫做IP数据报</p><h3 id="数据链路层" tabindex="-1"><a class="header-anchor" href="#数据链路层" aria-hidden="true">#</a> 数据链路层</h3><p>数据链路层的功能是：[[数据链路层#封装成帧|封装成帧]]、[[数据链路层#差错控制|差错控制]]、[[数据链路层#透明传输|透明传输]]</p><h3 id="物理层" tabindex="-1"><a class="header-anchor" href="#物理层" aria-hidden="true">#</a> 物理层</h3><p>物理层的功能：物理层上所传数据的单位是比特，确定与传输媒体的接口有关的一些特性，实现在连接各种计算机的传输媒体上数据比特流的传输，而且要尽可能地屏蔽掉这些传输媒体和通信手段的差异。这些特性包括机械特性、电气特性、功能特性、过程特性（指明对于不同功能的各种可能事件的出现顺序）</p><h3 id="实体、协议、服务和服务访问点实体" tabindex="-1"><a class="header-anchor" href="#实体、协议、服务和服务访问点实体" aria-hidden="true">#</a> 实体、协议、服务和服务访问点实体</h3><p>实体、协议、服务和服务访问点实体 (entity) 表示任何可发送或接收信息的硬件或软件进程。协议是控制两个对等实体进行通信的规则的集合。</p><p>在协议的控制下，两个对等实体间的通信使得本层能够向上一层提供服务。要实现本层协议，还需要使用下层所提供的服务。</p><p>上层使用服务原语获得下层所提供的服务。</p><p>同一系统相邻两层的实体进行交互的地方，称为服务访问点 SAP (Service Access Point)。服务访问点SAP是一个抽象的概念，它实际上就是一个逻辑接口。 协议和服务的区别和联系 协议是“水平的”，即协议是控制对等实体之间通信的规则。服务是“垂直的”，即服务是由下层向上层通过层间接口提供的。 本层的服务用户只能看见服务而无法看见下面的协议。即下面的协议对上面的服务用户是透明的。</p><p>在协议的控制下，两个对等实体间的通信使得本层能够向上一层提供服务。要实现本层协议，还需要使用下层所提供的服务。</p><p>协议必须把所有不利的条件事先都估计到，而不能假定一切都是正常的和非常理想的。</p>',20);function u(P,_){const r=o("ExternalLinkIcon");return i(),n("div",null,[s,e("p",null,[t("![Everything over IP，IP over Everything]("),e("a",c,[t("http://huxzhi-imgsubmit.oss-cn-beijing.aliyuncs.com/img/Everything"),h(r)]),t(" over IP，IP over Everything.png)")]),l])}const b=a(p,[["render",u],["__file","概论.html.vue"]]);export{b as default};
