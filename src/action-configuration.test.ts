import { expect, test, describe, it } from "@jest/globals";
import { getConfig } from "./action-configuration";

describe("getConfig", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      "INPUT_SERVICE": "service_name",
      "INPUT_SOURCE-CONNECTION-ARN": "source_connection_arn",
      "INPUT_REPO": "repo_url",
      "INPUT_RUNTIME": "NODEJS_16",
      "INPUT_BUILD-COMMAND": "build-command",
      "INPUT_START-COMMAND": "start-command"
    }
  })

  afterEach(() => {
    process.env = { ...originalEnv }
  })

  test("autoscaling config ARN is undefined when input is not specified/empty", () => {
    expect(getConfig().autoScalingConfigArn).toBeUndefined();
  })

  it('should return tcp healtcheck protocol when path is not set', () => {
    const config = getConfig();
    expect(config.healthCheckConfig.protocol).toBe('TCP');
  })

  it('should return http healthcheck protocol when healthcheck-path is set', () => {
    process.env["INPUT_HEALTHCHECK-PATH"] = "/health";
    const config = getConfig();
    expect(config.healthCheckConfig.protocol).toBe('HTTP');
  })
})
