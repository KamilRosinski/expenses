package expenses.server.logic;

import expenses.server.rest.dto.AccountingPeriodDTO;
import expenses.server.rest.dto.AccountingPeriodOverviewDTO;

import java.time.YearMonth;
import java.util.List;

public interface AccountingPeriodService {

	List<AccountingPeriodOverviewDTO> getOverviews();

	AccountingPeriodDTO getById(Long id);

	AccountingPeriodDTO createForYearMonth(YearMonth yearMonth);

}
