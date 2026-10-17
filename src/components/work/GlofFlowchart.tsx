/** The scoring flowchart from the GLOF report, scrollable sideways on small screens. */
export function GlofFlowchart() {
  return (
    <figure className="diagram">
      <div className="scroll">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/glof-flowchart.webp"
          alt="Flowchart of the GLOF risk assessment. Sensor inputs from a water-flow sensor, rain gauge and GNSS ground-movement sensor feed weighted component scores. The hazard score sets a hazard level. An exposure analysis from population and distance combines with the hazard score into a combined risk level of low, moderate or high."
          width={1774}
          height={887}
          loading="lazy"
        />
      </div>
      <figcaption>The scoring flowchart from the project report. Scroll sideways on small screens.</figcaption>
    </figure>
  );
}
