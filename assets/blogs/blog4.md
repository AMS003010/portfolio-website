GSOC 2025: Center for Translational Data Science
================================================

[![Abhijith M S](https://miro.medium.com/v2/resize:fill:64:64/1*jYWE0Ldgmzrctv-63kLlwQ.jpeg)](https://medium.com/@ams_132?source=post_page---byline--fda147e16cf6---------------------------------------)

[Abhijith M S](https://medium.com/@ams_132?source=post_page---byline--fda147e16cf6---------------------------------------)

7 min read

·

Aug 30, 2025

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2Ffda147e16cf6&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40ams_132%2Fgsoc-2025-center-for-translational-data-science-fda147e16cf6&user=Abhijith+M+S&userId=93ef70aee8c8&source=---header_actions--fda147e16cf6---------------------clap_footer------------------)

--

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2Ffda147e16cf6&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40ams_132%2Fgsoc-2025-center-for-translational-data-science-fda147e16cf6&source=---header_actions--fda147e16cf6---------------------bookmark_footer------------------)

Listen

Share

Towards a Data Commons Operations Center with Observability and Monitoring

![Source of Image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*dcK8hQubRKbWF0UbQ7o2gA.png)

Contributor: [Abhijith M S](https://github.com/AMS003010)

Mentor: [J. Qureshi](https://github.com/jawadqur)

Introduction:
-------------

As **GSoC 2025** comes to an end, I realize that I have never learned so much in such a short span of time, and for that, I will remain forever grateful. While I have always been interested in contributing to open source, this experience has truly fueled my passion to continue doing so.

One of the most rewarding parts of this journey was being exposed to new tools and technologies, many of which have now become a part of my daily development workflow. I had the opportunity to work with and learn about powerful systems and protocols such as **Keycloak**, **gRPC**, **WebSockets**, and **SPDY**, all of which significantly broadened my technical understanding and hands-on experience.

I would like to extend my heartfelt thanks to my mentor, **Jawad Qureshi**, for his constant guidance, patience, and encouragement throughout the project. His support not only helped me navigate challenges but also inspired me to push my limits and grow as a developer.

This blog is about my GSOC experience working under the CTDS organization. All my commits can be found [here](https://github.com/uc-cdis/gen3-admin/pull/55).

### **About the organization:**

**The Center for Translational Data Science** at the University of Chicago develops and operates large-scale data platforms to support research in topics of societal interest.

The organization operates a data ecosystem with their partners, comprising over a dozen data commons that make over 10 PB of data available to the research community. These are all based on the open-source Gen3 data platform, which includes the Gen3 data commons, Gen3 Framework Services, and Gen3 Workspaces.

I was involved in contributing to the CSOC Dashboard which would serve as a multiple gen3 cluster observation dashboard in terms of Observability and Monitoring.

### **_CSOC_**

The Gen3 CSOC Dashboard is a centralized platform designed to facilitate the management of multiple Gen3 deployments and Kubernetes clusters. Built with scalability and enterprise requirements in mind, it provides system administrators and operators with a comprehensive set of tools to deploy, monitor, and manage their Gen3 ecosystems effectively across cloud-native environments.

### **About the project:**

*   The project focused on building a **centralized platform to deploy and manage Gen3 clusters efficiently**, providing a single point of control for administrators.
*   My contributions were primarily centered around enhancing the platform's functionality and user experience. I worked on **integrating Keycloak for authentication and access management**, **developing an environment overview feature** to give users better visibility into cluster resources, and **implementing a shell access feature** that allows users to connect directly to a container inside a pod through the UI.
*   The project leveraged a modern tech stack, including **Gin (Golang)** for the backend, **Next.js** for the frontend, and container orchestration tools such as **Docker**, **Kubernetes**, and **Helm**.

### Why I chose this project:

*   I wanted to gain hands-on exposure to **cloud technologies**, and this project gave me exactly that -working directly with a deployed Gen3 cluster on Rackspace was an exciting opportunity 😋.
*   Having explored **Golang** and frontend technologies like **Next.js**, **React.js**, and **Tailwind CSS** for some time, I was eager to put my skills into action by contributing to open source, and CTDS provided the perfect platform for it. The frontend used **Mantine UI** (Something I was excited to use for the first time 😊)
*   What really drew me in was the project's complexity: so many components interacting with each other over a network, using different **protocols and architectures**. That challenge was both exciting and motivating, making it the ideal project for me to learn and grow !!

### Deliverables of the project:

*   Integration of **Keycloak** for authentication and access management
*   Developing an **environment overview** of a cluster
*   Implementing a **shell access feature** that allows users to connect directly to a container inside a pod through the UI

### Keycloak Integration:

Keycloak is an **open-source identity and access management solution** that provides features like single sign-on (SSO), user federation, and role-based access control. It allows developers to secure applications and services without having to handle authentication and authorization logic manually. Keycloak supports modern protocols such as **OAuth2.0, OpenID Connect, and SAML**, making it easy to integrate with a wide range of applications. It is widely used to centralize authentication, manage users, and streamline secure access across distributed systems.

The authentication and authorization workflow was designed so that users log into the **CSOC portal** through the **Keycloak login page**, which issues both **access tokens (JWTs)** and **refresh tokens**. This flow was integrated with **NextAuth** to manage user sessions and automatically refresh tokens when needed. Keycloak embeds user-specific roles and groups directly into the access token, which is then sent by the frontend with each request to the backend server (built with **Gin**) for access control.

On the backend, the server parses the JWT to extract details such as user information, roles, and groups, and enforces authorization policies accordingly. The system supports three role types - **Read**, **Write**, and **Superadmin** - all of which can be managed centrally through the **Keycloak admin console**.

### Environment Overview Dashboard:

CSOC is designed to simplify the management of not only clusters as a whole but also the individual resources within them and it supports managing **multiple clusters** seamlessly. The **Environment Overview** dashboard provides key metrics such as overall CPU and memory usage, per-pod CPU and memory consumption, and the real-time status of each pod. It also displays all cluster events while highlighting critical ones separately, enabling users to monitor the cluster's health and activity at a glance.

The dashboard was built using **Mantine UI**, which offered a rich set of ready-to-use components including icons, charts, and interactive UI elements, that made development faster and the interface more user-friendly.

### Container Shell Access:

This feature enables administrators to open an **interactive shell session** directly within any pod of their cluster, without leaving the **CSOC portal**. The terminal interface is built using **xterm.js**, providing a fully interactive, in-browser terminal experience.

**SPDY** is a now-deprecated Google protocol that laid the foundation for HTTP/2, designed to reduce latency by enabling multiplexed streams over a single TCP connection. Kubernetes still relies on SPDY for certain operations such as `kubectl exec`, port forwarding, and attach. In this project, the **SPDY executor** was used to establish and manage low-level streams between the Kubernetes client and container.

**WebSockets**, on the other hand, provide a **full-duplex communication channel** over a single TCP connection, making them ideal for interactive, real-time use cases like terminal sessions. In this implementation, WebSocket traffic between the frontend and backend is further routed through **gRPC secure (gRPCs) channels** between the CSOC server and the cluster agents, ensuring encrypted, efficient, and reliable communication.

The workflow begins when the frontend sends an **HTTP request** to the backend server (Gin). This request is **upgraded to a WebSocket connection**, which is then tunneled over the **gRPCs channel** to the corresponding **cluster agent**. The agent leverages the **Kubernetes client-go library** to create a Kubernetes client and uses the **SPDY executor** to initiate an `exec` session into the target container. All required metadata-such as the **container name, namespace, and cluster identifier**-is included in the initial request to establish the correct execution context.

This architecture enables secure, low-latency, bi-directional communication between the browser-based terminal and the container, effectively replicating **kubectl exec** functionality inside the CSOC dashboard.

![Container Shell Access Workflow](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*8dhTJ4-SIBW7SM41e6Szyw.png)

### **Testing:**

The code was primarily validated using **manual unit tests**, given the distributed nature of the project and the multiple components interacting across different layers.

The tests covered not only the core functionality but also a variety of edge cases, such as **invalid or false authorization attempts**, **sustaining long-running terminal sessions**, and **handling incorrect Keycloak realm configurations**. This ensured that the system remained robust and reliable under different scenarios.

### Future Scopes:

*   **Terraform integration** to streamline infrastructure provisioning and automated deployments.
*   Enhanced observability through proper integration of **Mimir** (for metrics) and **Loki** (for log aggregation).

### Challenges I faced

*   **Familiarizing with the repository** took longer than expected, but with my mentor's guidance in pointing out the most relevant areas, I was able to navigate it effectively.
*   **Adapting to Mantine UI** was initially challenging, as its component patterns felt quite different compared to the more familiar frameworks I had worked with, like Next.js.
*   **Optimizing concurrency with goroutines** required a learning curve to understand best practices and ensure the code was both efficient and reliable.

### What I learnt in GSoC

*   Proper use of **GitHub** and best practices
*   **Go concurrency** with goroutines, waitgroups, and channels
*   **gRPC**, **protobufs**, and protocols like WebSockets & SPDY
*   Working with the **Kubernetes API**
*   Explored **FlatBuffers** and **zero-allocation logging**

My GSOC journey (May 2025 - September 2025)
-------------------------------------------

### Community Bonding Period (May 8 - June 1)

*   During this phase, I spent time getting familiar with what the community does, their projects and practices.
*   I joined their slack and introduced myself

### Coding Period I (June 2 - July 18)

*   During this phase, I spent time getting familiar with the project repository, exploring the codebase, and setting up my development environment.
*   I also got to know my mentor and discussed the scope of work, milestones, and expectations for the summer.
*   Implemented the environment overview dashboard
*   Researched into how to integrate Keycloak into CSOC and started implemention

### Coding Period II (July 18 - August 25)

*   Completely implemented Keycloak Integration
*   Looked into making the environment overview dashboard better
*   Implemented shell access for container in a pod
*   Added documentation of how to configure keycloak

Overall Experience
------------------

Participating in **GSoC 2025** has been one of the most rewarding experiences of my journey so far. It gave me the chance to work on real-world problems, improve my technical skills, and gain confidence in contributing to open source. Beyond just coding, I learned how to approach problems systematically, collaborate effectively, and deliver work that others can build upon.

I'm truly grateful for this opportunity and excited to continue contributing to open source in the future. Hopefully, this is just the beginning, and I look forward to taking on even bigger challenges in the years to come.

Thank you for reading the blog!

Abhijith M S

GSoC Contributor, 2025