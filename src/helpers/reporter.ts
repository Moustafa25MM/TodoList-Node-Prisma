import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption,
} from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.SuiteInfo;

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `${log}`;
  }

  public displaySpecSuccess(
    spec: jasmine.CustomReporterResult,
    log: string
  ): string {
    return `SUCCESS: ${log}`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE,
      displaySuccessful: true,
      displayFailed: true,
      displayPending: true,
    },
    summary: {
      displayDuration: true,
    },
    customProcessors: [CustomProcessor],
  })
);
