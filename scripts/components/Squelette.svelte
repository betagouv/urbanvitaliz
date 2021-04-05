<script>
    import baseUrl from '../baseUrl.js'

    export let listeRessourceURL = '';


</script>

<div class="flex-container">
    <section class="colonne-de-gauche">
        <nav class="rf-sidemenu" aria-label="Menu latéral">
            <div class="rf-sidemenu__inner">
                <button
                    class="rf-sidemenu__btn"
                    hidden
                    aria-controls="rf-sidemenu-wrapper"
                    aria-expanded="false">Dans cette rubrique</button>
                <div class="rf-collapse" id="rf-sidemenu-wrapper">
                    <ul class="rf-sidemenu__list">
                        <!-- <li class="rf-sidemenu__item rf-sidemenu__item--active">
                    <a class="rf-sidemenu__link" href="#" target="_self" aria-current="page">Accès direct</a>
                </li> -->
                        <li class="rf-sidemenu__item">
                            <a class="rf-sidemenu__link" href="{baseUrl}/recherche-ressource"><span class="rf-fi-file-line" aria-hidden="true"></span>Rechercher une ressource</a>
                        </li>
                        <li class="rf-sidemenu__item">
                            <a class="rf-sidemenu__link" href="{baseUrl}/bacasable_perrine/home3_choix_chapitre.html"><span class="rf-fi-file-line" aria-hidden="true"></span>Parcours méthodologie</a>
                        </li>
                        <li class="rf-sidemenu__item">
                            <a class="rf-sidemenu__link" href="{listeRessourceURL}"><span class="rf-fi-file-line" aria-hidden="true"></span>Mes ressources</a>
                        </li>
                        <li class="rf-sidemenu__item">
                            <a class="rf-sidemenu__link" href="{baseUrl}/toutes-les-ressources"><span class="rf-fi-file-line" aria-hidden="true"></span>Toutes les ressources</a>
                        </li>
                        <!--
                        
                        -->
                    </ul>
                </div>
            </div>
        </nav>

        <section class="contact">
            <p>Vous n'avez pas trouvé de quoi faire avancer votre projet de friche ?</p>
            <button class="rf-btn rf-btn--secondary">Contactez-nous<span class="rf-fi-mail-line" aria-hidden="true"></span></button>
        </section>
    </section>
    <section class="colonne-du-centre">
        <slot name="colonne-du-centre"></slot>
    </section>
    
	<section class="colonne-de-droite">
	    <slot name="colonne-de-droite"></slot>
    </section>
</div>



<style lang="scss">
    @import "../../node_modules/@gouvfr/dsfr/packages/schemes/src/styles/settings/_colors.scss";

    .flex-container{
        display: flex;
        flex-direction: row;
        width: 100%;

        .colonne-de-gauche{
            flex: 3;

            background-color: #F8F8F8;
            
            .contact{
                color: $blue-france-500;
                text-align: left;
                padding: 1.5rem;
                margin-top: 10rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                .rf-fi-mail-line{
                    font-size: 1rem;
                    margin-left: 0.5rem;
                }
            }
        }
        .colonne-du-centre{
            flex: 10;
            max-width: 50%;
            padding: 0.5rem 1rem;
        }
        .colonne-de-droite{
            flex: 3;
            padding: 0.5rem 1rem;
            background-color: hsl(240, 36.8%, 96.3%);
        }
    }
    
    .rf-sidemenu{
        padding-right: 0;

        .rf-sidemenu__inner{
            width: 17rem;
            border: none;
        }
        .rf-sidemenu__link{
            font-size: 16px;
            line-height: 1.5em;

            .rf-fi-file-line{
                padding-right: 0.5rem;
            }
        }
    }
    
</style>