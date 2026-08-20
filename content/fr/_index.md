---
title: "Page d'accueil du laboratoire de recherche"
date: 2026-08-20
design:
  lang: fr
summary: "Bienvenue au laboratoire SAGE à l'UQAR, explorant le Soi, l'Altruisme, les Groupes et l'Empathie."
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
        text: "Rejoignez notre communauté dynamique d'investigateurs principaux, postdocs et chercheurs qui repoussent les limites de la connaissance sur le soi, l'altruisme, les groupes et l'empathie."
        title: "SAGE : Soi, Altruisme, Groupes, et Empathie"
        eyebrow: Bienvenue à SAGE
        primary_action:
          url: "#join-us"
          icon: hero/arrow-right
          text: Nous joindre
          style: gradient
        secondary_action:
          url: "#publications"
          icon: hero/book-open
          text: Voir les publications
          style: ghost
  - id: team
    block: team-showcase
    content:
        title: Rencontrez notre équipe
        members:
          - bio: "Expert en biologie moléculaire et génétique avec 15 ans d'expérience de recherche."
            name: Dr. Alice Johnson
            role: Investigatrice principale
            avatar: assets/media/team-alice-johnson.jpg
            social:
                - icon: brands/github
                  link: "https://github.com/alicejohnson"
                - icon: academicons/orcid
                  link: "https://orcid.org/0000-0001-2345-6789"
          - bio: Axé sur la bioinformatique et les modèles computationnels en recherche sur les maladies.
            name: Dr. Brian Lee
            role: Chercheur postdoctoral
            avatar: assets/media/team-brian-lee.jpg
            social:
                - icon: brands/github
                  link: "https://github.com/brianlee"
                - icon: academicons/orcid
                  link: "https://orcid.org/0000-0002-3456-7890"
          - bio: Spécialiste en neurobiologie et troubles cognitifs.
            name: Dr. Carol Smith
            role: Investigatrice principale
            avatar: assets/media/team-carol-smith.jpg
            social:
                - icon: brands/github
                  link: "https://github.com/carolsmith"
                - icon: academicons/orcid
                  link: "https://orcid.org/0000-0003-4567-8901"
          - bio: Recherche sur la signalisation cellulaire et les interactions protéiques.
            name: Dr. David Yang
            role: Chercheur postdoctoral
            avatar: assets/media/team-david-yang.jpg
            social:
                - icon: brands/github
                  link: "https://github.com/davidyang"
                - icon: academicons/orcid
                  link: "https://orcid.org/0000-0004-5678-9012"
          - bio: Se concentre sur la biologie du cancer et les thérapies ciblées.
            name: Dr. Emily Zhang
            role: Investigatrice principale
            avatar: assets/media/team-emily-zhang.jpg
            social:
                - icon: brands/github
                  link: "https://github.com/emilyzhang"
                - icon: academicons/orcid
                  link: "https://orcid.org/0000-0005-6789-0123"
        subtitle: 5 investigateurs principaux et postdocs menant des recherches de pointe
  - id: projects
    block: collection
    content:
        title: Projets financés
        subtitle: Nos projets de recherche en cours financés par les principales organisations
        itemCount: 3
        collection: project
  - id: publications
    block: collection
    content:
        title: Publications
        subtitle: Articles récents et publications de notre équipe
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
        text: Nous recherchons des chercheurs et collaborateurs talentueux. Explorez les postes et opportunités disponibles pour travailler avec nous.
        title: Joignez-vous à notre équipe
        button:
          url: /join-us/
          icon: hero/arrow-right
          text: Voir les postes ouverts
---
