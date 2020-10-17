define({ "api": [
  {
    "type": "delete",
    "url": "v1/users/:userId/favorites/:workoutId",
    "title": "Remove workout from user's favorites",
    "group": "Users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>user's own userId</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "workoutId",
            "description": "<p>workoutId</p>"
          },
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "JWToken",
            "description": "<p>users remove their own favorites</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/users.js",
    "groupTitle": "Users",
    "name": "DeleteV1UsersUseridFavoritesWorkoutid"
  },
  {
    "type": "get",
    "url": "v1/users/:userId/favorites",
    "title": "Request list of user's favorite workouts",
    "group": "Users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>userId</p>"
          },
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "JWToken",
            "description": "<p>users can access just their own information</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "createDate",
            "description": "<p>datetime of the workout creation.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Workout title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Workout description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "equipmentRequired",
            "description": "<p>id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>workout popularity (likes)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of the user that created the workout</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n       \"id\": 18,\n       \"createDate\": \"2020-10-04T15\",\n       \"title\": \"testing\",\n       \"description\": \"testing\",\n       \"duration\": 3,\n       \"equipmentRequired\": 0,\n       \"rating\": 0,\n       \"createdBy\": 1\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/v1/users.js",
    "groupTitle": "Users",
    "name": "GetV1UsersUseridFavorites"
  },
  {
    "type": "get",
    "url": "v1/users/:userId/profile",
    "title": "Request user's profile information",
    "group": "Users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>userId</p>"
          },
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "JWToken",
            "description": "<p>users can access just their own information</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>userId</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>user's email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "createdAt",
            "description": "<p>creation datetime</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>update datetime</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/users.js",
    "groupTitle": "Users",
    "name": "GetV1UsersUseridProfile"
  },
  {
    "type": "post",
    "url": "v1/users/:userId/favorites/:workoutId",
    "title": "Add workout to user's favorites",
    "group": "Users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>user's own userId</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "workoutId",
            "description": "<p>workoutId of the added workout</p>"
          },
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "JWToken",
            "description": "<p>users add workouts to their own favorites</p>"
          }
        ]
      }
    },
    "filename": "routes/v1/users.js",
    "groupTitle": "Users",
    "name": "PostV1UsersUseridFavoritesWorkoutid"
  },
  {
    "type": "get",
    "url": "v1/workouts/",
    "title": "Request all workouts (best rating first)",
    "group": "Workouts",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>workout title (or part of it)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "equipment",
            "description": "<p>true:required.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>result limit.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "createDate",
            "description": "<p>datetime of the workout creation.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Workout title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Workout description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "equipmentRequired",
            "description": "<p>id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>workout popularity (likes)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of the user that created the workout</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n       \"id\": 18,\n       \"createDate\": \"2020-10-04T15\",\n       \"title\": \"testing\",\n       \"description\": \"testing\",\n       \"duration\": 3,\n       \"equipmentRequired\": 0,\n       \"rating\": 0,\n       \"createdBy\": 1\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/v1/workouts.js",
    "groupTitle": "Workouts",
    "name": "GetV1Workouts"
  },
  {
    "type": "get",
    "url": "v1/workouts/:id",
    "title": "Request all workouts created by a user",
    "group": "Workouts",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "createDate",
            "description": "<p>datetime of the workout creation.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Workout title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Workout description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "equipmentRequired",
            "description": "<p>id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>workout popularity (likes)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Id of the user that created the workout</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n       \"id\": 18,\n       \"createDate\": \"2020-10-04T15\",\n       \"title\": \"testing\",\n       \"description\": \"testing\",\n       \"duration\": 3,\n       \"equipmentRequired\": 0,\n       \"rating\": 0,\n       \"createdBy\": 1\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/v1/workouts.js",
    "groupTitle": "Workouts",
    "name": "GetV1WorkoutsId"
  },
  {
    "type": "post",
    "url": "v1/workouts/",
    "title": "Post new workout",
    "group": "Workouts",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "title",
            "description": "<p>workout title</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "description",
            "description": "<p>workout description</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>workout duration in minutes</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "equipmentRequired",
            "description": "<p>true: equipment required</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "createdBy",
            "description": "<p>userID of the user creating the workout</p>"
          },
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "JWTokens",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/v1/workouts.js",
    "groupTitle": "Workouts",
    "name": "PostV1Workouts"
  }
] });
