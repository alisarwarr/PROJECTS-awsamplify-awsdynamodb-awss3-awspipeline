import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as ddb from '@aws-cdk/aws-dynamodb';

export class CdkAppsyncBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    //APPSYNC's API gives you a graphqlApi with apiKey
    //( for deploying APPSYNC )
    const api = new appsync.GraphqlApi(this, 'GraphqlApi', {
      name: 'serverlesstodoapp-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY
        }
      }
    });


    //print graphqlApi Url on console after deploy APPSYNC
    //( send by APPSYNC's API )
    new cdk.CfnOutput(this, 'GraphQlAPIURL', {
      value: api.graphqlUrl
    });


    //print apiKey on console after deploy APPSYNC
    //( send by APPSYNC's API )
    new cdk.CfnOutput(this, 'GraphQLAPIKey', {
      value: api.apiKey || ''
    });


//**************************DYNAMODB**************************/
    //creating table
    const myTable = new ddb.Table(this, 'serverlesstodoapp-table', {
      partitionKey: {                          //like unique primarykey for record indentification
        name: 'id',
        type: ddb.AttributeType.STRING
      }
    });
    //creating table
//**************************DYNAMODB**************************/


    //setting table as a datasource of endpoint
    const db_datasource = api.addDynamoDbDataSource('DBDataSource', myTable);


    //describing resolver for datasource
    db_datasource.createResolver({
      typeName: "Mutation",
      fieldName: "createTodo",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        appsync.PrimaryKey.partition('id').auto(),
        appsync.Values.projecting()
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
    });

    db_datasource.createResolver({
      typeName: "Mutation",
      fieldName: "deleteTodo",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbDeleteItem('id', 'thatId'),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
    });

    db_datasource.createResolver({
      typeName: "Mutation",
      fieldName: "updateTodo",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        appsync.PrimaryKey.partition('id').is('id'),
        appsync.Values.projecting()
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
    });

    db_datasource.createResolver({
      typeName: "Query",
      fieldName: "allTodos",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList()
    });
  }
}
