---
title: English Homepage
date: 2026-08-20
design:
  lang: en
summary: "Welcome to SAGE research lab at UQAR, exploring Self, Altruism, Groups, & Empathy."
type: landing
sections:
  - id: hero
    block: hero
    design:
        spacing:
          padding:
            - 4rem
            - 0
            - 4rem
            - 0
        background:
          gradient:
            end: transparent
            start: primary-500
            direction: 135
        text_color_light: true
    content:
        text: "Join our vibrant community of principal investigators, postdocs, and researchers pushing the boundaries of knowledge in self, altruism, groups, and empathy."
        title: "SAGE : Self, Altruism, Groups, & Empathy"
        eyebrow: Welcome to SAGE
        primary_action:
          url: "#join-us"
          icon: hero/arrow-right
          text: Join Us
          style: gradient
        secondary_action:
          url: "#publications"
          icon: hero/book-open
          text: View Publications
          style: ghost
  - id: team
    block: team-showcase
    content:
        title: Meet Our Team
        members:
          - bio: Expert in molecular biology and genetics with 15 years of research experience.
            name: Dr. Alice Johnson
            role: Principal Investigator
            avatar: assets/media/team-alice-johnson.jpg
            social:
                - icon: brands/github
                  link: "https://github.com/alicejohnson"
                - icon: academicons/orcid
                  link: "https://orcid.org/0000-0001-2345-6789"
          - bio: Focused on bioinformatics and computational models in disease research.
            name: Dr. Brian Lee
            role: Postdoctoral Researcher
            avatar: assets/media/team-brian-lee.jpg
            social:
                - icon: brands/github
                  link: "https://github.com/brianlee"
                - icon: academicons/orcid
                  link: "https://orcid.org/0000-0002-3456-7890"
          - bio: Specialist in neurobiology and cognitive disorders.
            name: Dr. Carol Smith
            role: Principal Investigator
            avatar: assets/media/team-carol-smith.jpg
            social:
                - icon: brands/github
                  link: "https://github.com/carolsmith"
                - icon: academicons/orcid
                  link: "https://orcid.org/0000-0003-4567-8901"
          - bio: Researching cellular signaling and protein interactions.
            name: Dr. David Yang
            role: Postdoctoral Fellow
            avatar: assets/media/team-david-yang.jpg
            social:
                - icon: brands/github
                  link: "https://github.com/davidyang"
                - icon: academicons/orcid
                  link: "https://orcid.org/0000-0004-5678-9012"
          - bio: Focuses on cancer biology and targeted therapies.
            name: Dr. Emily Zhang
            role: Principal Investigator
            avatar: assets/media/team-emily-zhang.jpg
            social:
                - icon: brands/github
                  link: "https://github.com/emilyzhang"
                - icon: academicons/orcid
                  link: "https://orcid.org/0000-0005-6789-0123"
        subtitle: "5 principal investigators & postdocs leading cutting-edge research"
  - id: projects
    block: collection
    content:
        title: Funded Projects
        subtitle: Our ongoing research projects funded by leading organizations
        itemCount: 3
        collection: project
  - id: publications
    block: collection
    content:
        title: Publications
        subtitle: Recent papers and articles by our team
        itemCount: 5
        collection: publication
  - id: join-us
    block: cta-card
    design:
        background:
          gradient:
            end: transparent
            start: secondary-500
            direction: 135
        text_color_light: true
    content:
        text: We are looking for talented researchers and collaborators. Explore available positions and opportunities to work with us.
        title: Join Our Team
        button:
          url: /fr/join-us/
          icon: hero/arrow-right
          text: See Open Positions
---
