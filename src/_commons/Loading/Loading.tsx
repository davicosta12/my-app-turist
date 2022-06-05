import './Loading.scss';
import React, { FunctionComponent } from 'react';

import { ProgressSpinner } from 'primereact/progressspinner';
import { Card } from 'primereact/card';

interface Props {
  active: boolean;
  fixed?: boolean;
}

const Loading: FunctionComponent<Props> = props => {

  return (
    <React.Fragment>
      {props.active && <Card className={`card-loader ${props.fixed ? 'fixed' : 'absolute'}`}>
        <div className="content-loader">
          <ProgressSpinner
            className="progressSpinner p-mr-3"
            strokeWidth="8"
            animationDuration=".5s"
          />
          <p>Carregando...</p>
        </div>
      </Card>}
    </React.Fragment>
  );
}

export default Loading

Loading.defaultProps = {
  fixed: false,
};