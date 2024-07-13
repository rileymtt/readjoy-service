/**
 * @swagger
 * /login:
 *      post:
 *          summary: Send the text to the server
 *          tags:
 *              - Administrator
 *          description: Send a message to the server and get a response added to the original text.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example:
 *                              password:
 *                                  type: password
 *                                  example:
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  accessToken:
 *                                      type: string
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 * /profile:
 *      get:
 *          summary: Get admin profile
 *          tags:
 *              - Administrator
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: false
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  text:
 *                                      type: string
 *                                      example: This is some example string!
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 * /users:
 *      post:
 *          summary: Get user list
 *          tags:
 *              - Administrator
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AdminBody'
 *          responses:
 *              201:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 * /articles:
 *      post:
 *          summary: Get article list
 *          tags:
 *              - Administrator
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AdminBody'
 *          responses:
 *              201:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 * /game-player/list:
 *      post:
 *          summary: Get list players random game
 *          tags:
 *              - Administrator
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AdminBody'
 *          responses:
 *              201:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 * /admin/game-player/create:
 *      post:
 *          summary: Get list players random game
 *          tags:
 *              - Administrator
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              required: true
 *          responses:
 *              201:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 * /admin/game-room/update:
 *      post:
 *          summary: Get list players random game
 *          tags:
 *              - Administrator
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              required: true
 *          responses:
 *              201:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 * /admin/game-room/list:
 *      post:
 *          summary: Get list players random game
 *          tags:
 *              - Administrator
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              required: true
 *          responses:
 *              201:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 * /admin/game-room/create:
 *      post:
 *          summary: Get list players random game
 *          tags:
 *              - Administrator
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              required: true
 *          responses:
 *              201:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */

/**
 * @swagger
 * /admin/game-player/update:
 *      post:
 *          summary: Get list players random game
 *          tags:
 *              - Administrator
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              required: true
 *          responses:
 *              201:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */
