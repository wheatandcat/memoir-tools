import * as functions from "firebase-functions";
import * as firestore from "@google-cloud/firestore";
const client = new firestore.v1.FirestoreAdminClient();

// Replace BUCKET_NAME
const bucket = "gs://memoir-firestore-backup";

const timezone = "Asia/Tokyo";
process.env.TZ = timezone;

exports.scheduledFirestoreExport = functions
  .region("asia-northeast1")
  .pubsub.schedule("every day 04:00")
  .onRun(() => {
    const projectId =
      process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT || "";
    const databaseName = client.databasePath(projectId, "(default)");

    return client
      .exportDocuments({
        name: databaseName,
        outputUriPrefix: bucket,
        // Leave collectionIds empty to export all collections
        // or set to a list of collection IDs to export,
        // collectionIds: ['users', 'posts']
        collectionIds: [],
      })
      .then((responses) => {
        const response = responses[0];
        console.log(`Operation Name: ${response["name"]}`);
      })
      .catch((err) => {
        console.error(err);
        throw new Error("Export operation failed");
      });
  });
