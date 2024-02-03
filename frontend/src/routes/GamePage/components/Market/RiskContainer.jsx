import { useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { fix } from '../../../../stores/gameStore/actions';
import { fixRisk } from '../../../../utils/ApiConf';

import Button from '../../../../components/UI/Button';
import Tooltip from '../../../../components/UI/Tooltip';

import { getSlabImg } from '../../../../utils/GetSlabImg';
import { bindActionCreators } from 'redux';
import { PlayerContext } from '../../../../components/PlayerProvider';

const RiskContainer = ({
  risk,
  fix,
  dictionary,
}) => {
  const { id } = useParams();
  const { player } = useContext(PlayerContext)

  const costsRef = useRef();

  const { id: riskId, costs, type, needed } = risk;

  const canbuy = player.cards.filter(f => f.subType === needed && f.selected).length >= costs;

  return (
    <div className='marketContainer' key={riskId}>
      <div className='riskContainer' disabled={!canbuy}>
        <h6 className='title'>{dictionary.risks.types[type]}</h6>
          <p
            className='cost'
            ref={costsRef}
          >
            {costs}
          </p>
        <Tooltip parentRef={costsRef} className='px-3 py-2'>
          {dictionary.risks.descriptions[type]}
        </Tooltip>
        <img
          alt={`img`}
          className='riskImg'
          src={getSlabImg(risk)}
          draggable={false}
        />
      </div>
      <Button
        disabled={!canbuy}
        className=''
        variants='primary outlined'
        onClick={() => fixRisk(id, riskId, player.cards.filter(f => f.selected)).then((calbackRes) => fix(calbackRes))}
      >
        {dictionary.fix}
      </Button>
    </div>
  );
}

function stateToProps(state,) {
  return {
    dictionary: {
      risks: state.lang.dictionary.risks,
      ...state.lang.dictionary.utils,
    },
  };
}

function dispatchToProps(dispatch) {
  return {
    fix: bindActionCreators(fix, dispatch),
  };
}

export default connect(stateToProps, dispatchToProps)(RiskContainer);
