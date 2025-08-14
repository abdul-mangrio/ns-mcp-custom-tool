/**
 * customtool_test1.jsc
 * @NApiVersion 2.1
 * @NModuleScope Public
 */

define(["N/record", "N/query", "N/log"], function (record, query, log) {
  return {
    add: function (args) {
      let a = args["a"];
      let b = args["b"];
      return a + b;
    },
    reverseText: function (args) {
      let text = args["text"];
      return text.split('').reverse().join('');
    },
    // Create a Journal Entry
    createJournalEntry: function (params) {
      if (!params) {
        return { error: "Missing journal entry parameters" };
      }
      let payload = JSON.parse(params.payload);
      let header = payload.header;
      let lines = payload.lines;
      try {
        var journalEntryRecord = record.create({
          type: record.Type.JOURNAL_ENTRY,
          isDynamic: true
        });

        // Set header fields
        Object.keys(header).forEach(function (key) {
          if (header[key] !== undefined && header[key] !== null) {
            journalEntryRecord.setValue({
              fieldId: key,
              value: header[key]
            });
          }
        });

        // Add lines
        lines.forEach(function (line) {
          journalEntryRecord.selectNewLine({ sublistId: "line" });

          Object.keys(line).forEach(function (fieldId) {
            if (line[fieldId] !== null && line[fieldId] !== undefined) {
              journalEntryRecord.setCurrentSublistValue({
                sublistId: "line",
                fieldId: fieldId,
                value: line[fieldId]
              });
            }
          });

          journalEntryRecord.commitLine({ sublistId: "line" });
        });

        var journalEntryId = journalEntryRecord.save();

        return JSON.stringify({
          success: true,
          journalEntryId: journalEntryId
        });
      } catch (e) {
        log.error("Error creating Journal Entry", e);
        return {
          error: e.message,
          code: e.name,
          details: e.toString()
        };
      }
    }
  }
});