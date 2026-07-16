import type { Cluster } from "../types/perseus/Cluster.ts";
import type { Resource } from "../types/perseus/Resource.ts";
import type { Limit } from "../types/perseus/Limit.ts";

export default async function getResourceData(): Promise<{
    clusters: Cluster[];
    resources: Resource[];
    limits: Limit[];
}> {
    /*const call: APIResponse<{
        cluster: Cluster[];
        cluster: ResourceInput[];
        limits: Limit[];
    }> = await makeAPICall<{
        cluster: Cluster[];
        cluster: ResourceInput[];
        limits: Limit[];
    }>(HTTPMethod.GET, "/perseus/service/ResourceManager/all");

    return call.statusCode === 200 && call.value !== null
        ? call.value
        : {
              cluster: [],
              cluster: [],
              limits: [],
          };*/

    return {
        clusters: [
            { _id: "67af092716acaef502c8f845", id: "oculus", name: "OCuLUS" },
            {
                _id: "67af092716acaef502c8f846",
                id: "noctua1",
                name: "Noctua 1",
            },
            { _id: "67af092716acaef502c8f847", id: "isilon", name: "Isilon" },
            {
                _id: "67af092716acaef502c8f848",
                id: "noctua2",
                name: "Noctua 2",
            },
            { _id: "685181f308012739fb153790", id: "otus", name: "Otus" },
        ],
        resources: [
            {
                _id: "67af092716acaef502c8f84a",
                id: "oculus_rtx",
                cluster_id: "oculus",
                name: "RTX GPU hours",
                resource_type: "cumulative",
                display_unit: "thousand",
                display_unit_factor: 1000,
            },
            {
                _id: "67af092716acaef502c8f84c",
                id: "oculus_temp_storage",
                cluster_id: "oculus",
                name: "Temporary storage",
                resource_type: "snapshot",
                display_unit: "TiB",
                display_unit_factor: 1099511627776,
            },
            {
                _id: "67af092716acaef502c8f854",
                id: "oculus_cpu_h",
                cluster_id: "oculus",
                name: "CPU core hours",
                resource_type: "cumulative",
                display_unit: "million",
                display_unit_factor: 1000000,
            },
            {
                _id: "67af092716acaef502c8f858",
                id: "oculus_gtx",
                cluster_id: "oculus",
                name: "GTX GPU hours",
                resource_type: "cumulative",
                display_unit: "thousand",
                display_unit_factor: 1000,
            },
            {
                _id: "67af092716acaef502c8f859",
                id: "oculus_tesla",
                cluster_id: "oculus",
                name: "Tesla GPU hours",
                resource_type: "cumulative",
                display_unit: "thousand",
                display_unit_factor: 1000,
            },
            {
                _id: "67af092716acaef502c8f849",
                id: "noctua1_a40",
                cluster_id: "noctua1",
                name: "A40 GPU hours",
                resource_type: "cumulative",
                display_unit: "thousand",
                display_unit_factor: 1000,
            },
            {
                _id: "67af092716acaef502c8f84b",
                id: "noctua1_temp_storage",
                cluster_id: "noctua1",
                name: "PC2PFS",
                resource_type: "snapshot",
                display_unit: "TiB",
                display_unit_factor: 1099511627776,
            },
            {
                _id: "67af092716acaef502c8f84f",
                id: "noctua1_temp_storage_files",
                cluster_id: "noctua1",
                name: "PC2PFS files",
                resource_type: "snapshot",
                display_unit: "million",
                display_unit_factor: 1000000,
            },
            {
                _id: "67af092716acaef502c8f850",
                id: "noctua1_fpga_h",
                cluster_id: "noctua1",
                name: "FPGA hours",
                resource_type: "cumulative",
                display_unit: "thousand",
                display_unit_factor: 1000,
            },
            {
                _id: "67af092716acaef502c8f855",
                id: "noctua1_cpu_h",
                cluster_id: "noctua1",
                name: "CPU core hours",
                resource_type: "cumulative",
                display_unit: "million",
                display_unit_factor: 1000000,
            },
            {
                _id: "67af092716acaef502c8f852",
                id: "isilon_storage",
                cluster_id: "isilon",
                name: "PC2DATA",
                resource_type: "snapshot",
                display_unit: "GiB",
                display_unit_factor: 1073741824,
            },
            {
                _id: "68234d88eae7f0c7220f5b86",
                id: "isilon_storage_files",
                cluster_id: "isilon",
                name: "PC2DATA files",
                resource_type: "snapshot",
                display_unit: "million",
                display_unit_factor: 1000000,
            },
            {
                _id: "67af092716acaef502c8f84d",
                id: "noctua2_cpu_h",
                cluster_id: "noctua2",
                name: "CPU core hours",
                resource_type: "cumulative",
                display_unit: "million",
                display_unit_factor: 1000000,
            },
            {
                _id: "67af092716acaef502c8f84e",
                id: "noctua2_temp_storage",
                cluster_id: "noctua2",
                name: "PC2PFS",
                resource_type: "snapshot",
                display_unit: "TiB",
                display_unit_factor: 1099511627776,
            },
            {
                _id: "67af092716acaef502c8f851",
                id: "noctua2_fpga_520n",
                cluster_id: "noctua2",
                name: "Bittware 520N FPGA hours",
                resource_type: "cumulative",
                display_unit: "thousand",
                display_unit_factor: 1000,
            },
            {
                _id: "67af092716acaef502c8f853",
                id: "noctua2_temp_storage_files",
                cluster_id: "noctua2",
                name: "PC2PFS files",
                resource_type: "snapshot",
                display_unit: "million",
                display_unit_factor: 1000000,
            },
            {
                _id: "67af092716acaef502c8f856",
                id: "noctua2_a100",
                cluster_id: "noctua2",
                name: "A100 GPU hours",
                resource_type: "cumulative",
                display_unit: "thousand",
                display_unit_factor: 1000,
            },
            {
                _id: "67af092716acaef502c8f857",
                id: "noctua2_fpga_u280",
                cluster_id: "noctua2",
                name: "Xilinx Alveo U280 FPGA hours",
                resource_type: "cumulative",
                display_unit: "thousand",
                display_unit_factor: 1000,
            },
            {
                _id: "6851827e48fe28a73c20b482",
                id: "otus_cpu_h",
                cluster_id: "otus",
                name: "CPU core hours",
                resource_type: "cumulative",
                display_unit: "million",
                display_unit_factor: 1000000,
            },
            {
                _id: "685182b7bb5447c5f799781b",
                id: "otus_h100",
                cluster_id: "otus",
                name: "H100 GPU hours",
                resource_type: "cumulative",
                display_unit: "thousand",
                display_unit_factor: 1000,
            },
            {
                _id: "68518330eebb1007a1251c36",
                id: "otus_fpga_v80",
                cluster_id: "otus",
                name: "AMD Alveo V80 FPGA hours",
                resource_type: "cumulative",
                display_unit: "thousand",
                display_unit_factor: 1000,
            },
            {
                _id: "68518363bb5447c5f799791c",
                id: "otus_temp_storage",
                cluster_id: "otus",
                name: "PC2PFS",
                resource_type: "snapshot",
                display_unit: "TiB",
                display_unit_factor: 1099511627776,
            },
            {
                _id: "6851837f5bc338dd59587abd",
                id: "otus_temp_storage_files",
                cluster_id: "otus",
                name: "PC2PFS files",
                resource_type: "snapshot",
                display_unit: "million",
                display_unit_factor: 1000000,
            },
        ],
        limits: [
            {
                _id: "67af092716acaef502c8f54d",
                id: "max_job_runtime",
                name: "Maximum job runtime",
                display_unit: "hours",
                display_unit_factor: 1,
            },
            {
                _id: "67af092716acaef502c8f54e",
                id: "ram_per_core",
                name: "RAM per core",
                display_unit: "GB",
                display_unit_factor: 1000000000,
            },
            {
                _id: "67af092716acaef502c8f54f",
                id: "cores_per_job",
                name: "Cores per job",
                display_unit: null,
                display_unit_factor: 1,
            },
            {
                _id: "67af092716acaef502c8f550",
                id: "total_cpu",
                name: "Total CPU core hours",
                display_unit: "million",
                display_unit_factor: 1000000,
            },
            {
                _id: "67af092716acaef502c8f551",
                id: "total_gpu",
                name: "Total GPU hours",
                display_unit: "thousand",
                display_unit_factor: 1000,
            },
            {
                _id: "67af092716acaef502c8f552",
                id: "total_fpga",
                name: "Total FPGA hours",
                display_unit: "thousand",
                display_unit_factor: 1000,
            },
        ],
    };
}
