import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos

class PostCreatePublish {
    visit() {
        cy.visit("https://ghost-aaej.onrender.com/ghost/#/posts");
    }

    clickNewPost() {
        cy.contains("New post").click();
    }

    selectImageForPost(tituloPost) {
        cy.get('path[d="M83.86 54.15v34.13H38.57V54.15H0v68.26h122.43V54.15H83.86zM38.57 0h45.3v34.13h-45.3z"]').click({ force: true });
        cy.get('input[name="searchKeyword"]').type(tituloPost);
        cy.get('a.gh-unsplash-button').contains('Insert image').click();
    }

    enterPostDetails(tituloPost) {
        cy.get('textarea[placeholder="Post title"]').type(tituloPost);
        const contenidoPost = faker.lorem.paragraph(3);
        cy.get('div[data-placeholder="Begin writing your post..."]').type(contenidoPost);
    }

    publishPost(tituloPost) {
        cy.get('button.gh-btn-editor.darkgrey.gh-publish-trigger').contains('Publish').click();
        cy.get('div.gh-publish-setting-trigger').contains('Right now').should('be.visible');
        cy.get('div.gh-publish-cta').contains('Continue, final review →').click();
        cy.get('div.gh-publish-title').contains('Ready, set, publish.').should('be.visible');
        cy.get('div.gh-publish-title').contains('Share it with the world.').should('be.visible');
        cy.get('button[class="gh-btn gh-btn-large gh-btn-pulse ember-view"]').contains('Publish post, right now').click();
        cy.contains(tituloPost).should('be.visible'); // Verificar que el post publicado esté visible
        cy.log(`El post "${tituloPost}" ha sido publicado correctamente.`);
        cy.wait(2000);
        cy.get('button[class="gh-back-to-editor"]').contains('Back to editor').click();
    }

    verifyPostPublished(tituloPost) {
        cy.visit("https://ghost-aaej.onrender.com/ghost/#/posts?type=published"); // Visitar los posts publicados
        cy.get('h3.gh-content-entry-title').contains(tituloPost).should('be.visible');
        cy.log(`El post "${tituloPost}" ha sido verificado en la pagina de publicados.`);
    }

    clearDetailsPost(){
        cy.get('textarea[placeholder="Post title"]').clear(); // Limpiar el título del post
        cy.log(`El título del post ha sido limpiado.`);
        cy.get('div[data-placeholder="Begin writing your post..."]').clear(); // Limpiar el contenido del post
    }

    editPost(tituloPost){
        cy.visit("https://ghost-aaej.onrender.com/ghost/#/posts?type=published"); // Visitar los posts publicados
        cy.get('h3.gh-content-entry-title').contains(tituloPost).click(); // Hacer clic en el post a editar
    }

    editPostDetails(nuevoTituloPost){
        cy.get('textarea[placeholder="Post title"]').clear(); // Limpiar el título del post
        cy.get('textarea[placeholder="Post title"]').type(nuevoTituloPost); // Ingresar un nuevo título de post
        const nuevoContenidoPost = faker.lorem.paragraph(3); // Generar un nuevo contenido de post
        cy.get('div[data-placeholder="Begin writing your post..."]').clear(); // Limpiar el contenido del post
        cy.get('div[data-placeholder="Begin writing your post..."]').type(nuevoContenidoPost); // Ingresar un nuevo contenido de post
    }

    updatePost(tituloPost) {
        cy.contains('Update').click();
        cy.log(`El post "${tituloPost}" ha sido actualizado correctamente.`);
        cy.wait(2000);
    }
}


export default new PostCreatePublish();

