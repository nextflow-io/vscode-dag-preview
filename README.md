# nextflow-dag-preview README

A simple extensions for previewing Nextflow-generated DAG for `.nf` files.

## Features

- Adds a preview button to `.nf` file editors that generates the DAG using Nextflow and displays it in a side panel.

## Requirements

For the extension to work, a valid `nextflow` executable should be available in your environment. Check out [https://www.nextflow.io/](https://www.nextflow.io/) for instructions on how to install it.

## Extension Settings

This extension contributes the following settings:

* `nextflowDagPreview.nextflowPath`: custom path to the `nextflow` binary used to generate the DAGs.
* `nextflowDagPreview.dagTmpFolder`: temporal directory for storing the nextflow DAG preview files
* `nextflowDagPreview.commandLineArgs`: additional command line arguments to pass to nextflow when generating the DAG (e.g. for providing input parameters)

## Known Issues

None

## Release Notes

Seee [changelog](./CHANGELOG.md)
