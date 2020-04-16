package expenses.server.logic;

import expenses.server.rest.dto.AccountingPeriodDTO;
import expenses.server.rest.dto.AccountingPeriodOverviewDTO;

import java.util.List;

public interface AccountingPeriodService {

	List<AccountingPeriodOverviewDTO> getOverviews();

	AccountingPeriodDTO getAccountingPeriodById(Long id);

}
