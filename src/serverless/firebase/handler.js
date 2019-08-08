import { sendSuccess, sendFatalError, sendValidationErrors } from '../../shared/utils/helpers'
import axios from 'axios'

const Joi = require('@hapi/joi')
// const Definitions = require('../../schema/definitions/firebase')

// https://developers.google.com/apis-explorer/#search/firestore/firestore/v1/firestore.projects.databases.documents.createDocument
// https://developers.google.com/apis-explorer/#search/firestore/firestore/v1/firestore.projects.databases.documents.get

const config = Joi.object()
  .keys({
    firebaseApiKey: Joi.string().allow('').optional(),
  })
  .required()

const payload = Joi.object()
  .keys({
    projectId: Joi.string().required(),
    databaseId: Joi.string().required(),
    collectionPath: Joi.string().required(),
    documentId: Joi.string()
      .optional()
      .notes(
        'The client-assigned document ID to use for this document. Optional. If not specified, an ID will be assigned by the service.'
      ),
      doc: Joi.object()
      .required()
      .notes('The document to create'),
  })
  .required()

const schema = Joi.object().keys({ config, payload })

const firestoreAdd = async (event, context, callback) => {
  try {
    // let {
    //   firebaseAddToFirestore: { schema },
    // } = Definitions
    let body = JSON.parse(event.body || {})
    const { error, value } = Joi.validate(body, schema, { abortEarly: false })
    if (error) return sendValidationErrors(error)

    let { config, payload } = value
    let { firebaseApiKey } = config
    let { projectId, databaseId, collectionPath, documentId, doc } = payload
    let url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/${collectionPath}?key=${firebaseApiKey}`
    if (documentId) url += `&documentId=${documentId}`
    let { data } = await axios.post(url, doc)

    const response = {
      statusCode: 200,
      body: JSON.stringify({ data }),
    }
    return response

    // // Return Success
    // return sendSuccess()
  } catch (error) {
    return sendFatalError(error)
  }
}
export { firestoreAdd }
