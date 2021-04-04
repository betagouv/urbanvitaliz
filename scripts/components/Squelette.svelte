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
                            <a class="rf-sidemenu__link" href="{listeRessourceURL}"><span class="rf-fi-file-line" aria-hidden="true"></span>Mes ressources</a>
                        </li>
                        <li class="rf-sidemenu__item">
                            <a class="rf-sidemenu__link" href="{baseUrl}/toutes-les-ressources"><span class="rf-fi-file-line" aria-hidden="true"></span>Toutes les ressources</a>
                        </li>
                        <!--
                        <li class="rf-sidemenu__item">
                            <a class="rf-sidemenu__link" href="./toute-les-ressoures"><span class="rf-fi-file-line" aria-hidden="true"></span>Méthodologie</a>
                        </li>
                        -->
                    </ul>
                </div>
            </div>
        </nav>
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