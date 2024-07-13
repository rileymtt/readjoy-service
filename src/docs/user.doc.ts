/**
 * @swagger
 * /user/login:
 *      post:
 *          summary: Login
 *          tags:
 *              - User
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: email
 *                              password:
 *                                  type: password
 *                                  example: password
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
 *
 * /user/register:
 *      post:
 *          summary: Register
 *          tags:
 *              - User
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: email
 *                              password:
 *                                  type: password
 *                                  example: password
 *                              ref:
 *                                  type: number
 *                                  example: 1
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
 *
 * /user/p:
 *      get:
 *          summary: Get profile by user id
 *          tags:
 *              - User
 *          parameters:
 *          - in: query
 *            name: id
 *            type: number
 *            example: 1
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: false
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 *
 * /user/profile:
 *      get:
 *          summary: Get profile
 *          tags:
 *              - User
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: false
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 *
 *      post:
 *          summary: Update profile
 *          tags:
 *              - User
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              firstName:
 *                                  type: string
 *                                  example: string
 *                              lastName:
 *                                  type: string
 *                                  example: string
 *                              middleName:
 *                                  type: string
 *                                  example: string
 *                              bio:
 *                                  type: string
 *                                  example: string
 *                              gender:
 *                                  type: boolean
 *                                  example: true
 *                              profilePicture:
 *                                  type: string
 *                                  example: string
 *                              coverPicture:
 *                                  type: string
 *                                  example: string
 *                              dob:
 *                                  type: string
 *                                  example: string
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 *
 * /user/profile/avatar:
 *      post:
 *          summary: Update avatar
 *          security:
 *             - bearerAuth: []
 *          tags:
 *              - User
 *          requestBody:
 *            required: true
 *            content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              imageUrl:
 *                                  type: string
 *                                  example: string
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 *
 * /user/profile/cover:
 *      post:
 *          summary: Update cover picture
 *          security:
 *             - bearerAuth: []
 *          tags:
 *              - User
 *          requestBody:
 *            required: true
 *            content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              imageUrl:
 *                                  type: string
 *                                  example: string
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 *
 * /user/update-wallet:
 *      post:
 *          summary: Update wallet address
 *          security:
 *             - bearerAuth: []
 *          tags:
 *              - User
 *          requestBody:
 *            required: true
 *            content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: string
 *                              signature:
 *                                  type: string
 *                                  example: string
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 *
 * /user/update-ref:
 *      post:
 *          summary: Update code ref
 *          security:
 *             - bearerAuth: []
 *          tags:
 *              - User
 *          requestBody:
 *            required: true
 *            content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ref:
 *                                  type: number
 *                                  example: 1
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 *
 * /user/medals:
 *      get:
 *          summary: Get medals
 *          tags:
 *              - User
 *          parameters:
 *            - in: query
 *              name: id
 *              type: number
 *              example: 1
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 *
 * /user/block-user:
 *      get:
 *          summary: Get block user list
 *          security:
 *             - bearerAuth: []
 *          tags:
 *              - User
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 *
 *      post:
 *          summary: Add block user
 *          security:
 *             - bearerAuth: []
 *          tags:
 *              - User
 *          requestBody:
 *            required: true
 *            content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              blockUserId:
 *                                  type: number
 *                                  example: 1
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 *
 *      put:
 *          summary: Remove block user
 *          security:
 *             - bearerAuth: []
 *          tags:
 *              - User
 *          requestBody:
 *            required: true
 *            content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              blockUserId:
 *                                  type: number
 *                                  example: 1
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 *
 * /user/delete:
 *      get:
 *          summary: Disable account
 *          security:
 *             - bearerAuth: []
 *          tags:
 *              - User
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 *
 * /user/get-message:
 *      get:
 *          summary: Get signature message for login with wallet address
 *          tags:
 *              - User
 *          parameters:
 *            - in: query
 *              name: walletAddress
 *              type: string
 *              example: 0xF8A6a062344ac61420337c1c5b16635f87c29d38
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 *
 * /user/settings:
 *      get:
 *          summary: Get user settings
 *          security:
 *             - bearerAuth: []
 *          tags:
 *              - User
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 *
 *      put:
 *          summary: Update user settings
 *          security:
 *             - bearerAuth: []
 *          tags:
 *              - User
 *          requestBody:
 *            required: true
 *            content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              blockUserId:
 *                                  type: number
 *                                  example: 1
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */
