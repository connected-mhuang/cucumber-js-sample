@pet
Feature: Mock API
  Scenario: GET /pet/:petId Success
    Given the request as
      | url    | pet/:petId     |
      | params | {"petId": 123} |
      | method | GET            |
    When the request is sent to "petServer"
    Then the response should return status "200" and response
      | photoUrls | object |
      | name      | string |
      | id        | number |
      | category  | object |
      | tags      | object |
      | status    | string |
  
  Scenario: GET /pet/:petId Failure
    Given the request as
      | url    | pet/:petId     |
      | params | {"petId": "abc"} |
      | method | GET            |
    When the request is sent to "petServer"
    Then the response should return status "400"

  Scenario: POST /store/order Success
    Given the request as
      | url    | store/order                                                                                                  |
      | body   | {"petId": 6,"quantity": 1,"shipDate": "2000-01-23T04:56:07.000+00:00","complete": false,"status": "placed" } |
      | method | POST                                                                                                         |
    When the request is sent to "petServer"
    Then the response should return status "200" and response
      | id       | number  |
      | petId    | number  |
      | quantity | number  |
      | shipDate | string  |
      | status   | string  |
      | complete | boolean |

  Scenario: POST /store/order Failure
    Given the request as
      | url    | store/order                                                                                                  |
      | body   | {"petId": 6,"quantity": 1,"shipDate": "2000-01-23T04:56:07.000+00:00","complete": false,"status": "whatever" } |
      | method | POST                                                                                                         |
    When the request is sent to "petServer"
    Then the response should return status "400"


